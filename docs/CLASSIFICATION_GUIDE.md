# Plant Disease Classification Implementation Guide

## Overview
AgriVision AI now includes **real plant disease classification** instead of random mock results. The system uses a comprehensive disease database sourced from authoritative Indian agricultural institutions and supports both API-based and local model-based classification.

---

## Current Status

### ✅ Completed Features

1. **Comprehensive Disease Database**
   - 6 diseases mapped with real data from ICAR/TNAU/PlantVillage
   - Each disease includes:
     - Scientific name and pathogen
     - Symptoms (English & Tamil)
     - Detailed treatment steps (5+ actionable items)
     - Recovery time estimates
     - Prevention guidelines
     - Source attribution

2. **Deterministic Results**
   - Image caching system ensures same image → same result
   - Hash-based cache key prevents random results on re-analysis
   - Cache persists during session

3. **Confidence Threshold**
   - 60% minimum confidence required
   - Low confidence shows honest message: "Unable to confidently identify - please consult a local agricultural officer"
   - No forced guesses

4. **Demo Mode Preservation**
   - 3 sample images (tomato, rice, healthy) return fixed results
   - Demo mode toggle (Alt+D) still functional for symposium judging
   - Real mode analyzes actual uploaded photos

5. **Bilingual Support**
   - All disease names, symptoms, treatments in English & Tamil
   - Seamless language switching preserves disease data

---

## Classification Methods

### Method 1: Plant.id API (Recommended for Production)

**Setup:**
1. Get API key from https://web.plant.id/
2. Set the `PLANT_ID_API_KEY` variable in index.html (line ~786):
   ```javascript
   const PLANT_ID_API_KEY = 'your-api-key-here';
   ```

**Features:**
- Real-time cloud-based plant health assessment
- High accuracy (90%+) with large training dataset
- Returns disease probability, treatment recommendations
- Supports 30+ plant diseases common in India

**Limitations:**
- Requires internet connection
- API rate limits (check pricing)
- ~2-5 second response time

**Current Implementation:**
- `classifyWithPlantId()` function sends base64 image to Plant.id API
- Maps Plant.id disease names to our database keys:
  - "bacterial spot" → `tomato_bacterial_spot`
  - "early blight" → `tomato_early_blight`
  - "late blight" → `tomato_late_blight`
  - "blast" → `rice_blast`
  - "bacterial blight" → `rice_bacterial_blight`
  - Healthy detection → `healthy`

### Method 2: TensorFlow.js Local Model (Future Enhancement)

**Placeholder Ready:**
The code includes preprocessing functions for local TensorFlow.js model:
- `preprocessImage()` - resizes to 224x224 for standard models
- Image normalization (0-1 range)
- Tensor conversion ready

**To Implement:**
1. Train or download a MobileNet-based plant disease model
2. Convert to TensorFlow.js format (`.json` + `.bin` files)
3. Host model files in `/models/plant-disease/`
4. Load model:
   ```javascript
   classificationModel = await tf.loadGraphModel('/models/plant-disease/model.json');
   ```
5. Run inference:
   ```javascript
   const tensor = tf.browser.fromPixels(canvas).expandDims(0).div(255.0);
   const predictions = await classificationModel.predict(tensor).data();
   ```

**Advantages:**
- Works offline
- No API costs
- Fast (<1 second)
- Privacy (no image upload)

**Limitations:**
- Model size (5-20MB download)
- Training data required
- Lower accuracy than cloud APIs (typically 75-85%)

---

## Disease Database Structure

### Included Diseases

1. **Tomato Bacterial Spot** (`tomato_bacterial_spot`)
   - Pathogen: *Xanthomonas spp.*
   - Severity: Medium
   - Treatment: Copper-based bactericide, reduce overhead irrigation
   - Source: ICAR-IIHR Vegetable Pathology Guidelines

2. **Tomato Early Blight** (`tomato_early_blight`)
   - Pathogen: *Alternaria solani*
   - Severity: Medium
   - Treatment: Mancozeb 75% WP, remove affected leaves
   - Source: TNAU Agritech Portal

3. **Tomato Late Blight** (`tomato_late_blight`)
   - Pathogen: *Phytophthora infestans*
   - Severity: High
   - Treatment: Metalaxyl + Mancozeb, urgent removal
   - Source: ICAR-CPRI Disease Management Guidelines

4. **Rice Blast** (`rice_blast`)
   - Pathogen: *Magnaporthe oryzae*
   - Severity: High
   - Treatment: Tricyclazole 75% WP, drain field
   - Source: TNAU Rice Research Station

5. **Rice Bacterial Blight** (`rice_bacterial_blight`)
   - Pathogen: *Xanthomonas oryzae*
   - Severity: High
   - Treatment: Streptocycline + Copper oxychloride
   - Source: ICAR-IIRR Bacterial Disease Management

6. **Healthy Plant** (`healthy`)
   - No disease detected
   - Maintenance recommendations
   - Source: TNAU Good Agricultural Practices

### Adding New Diseases

To add a new disease to the database, update `DISEASE_DATABASE` object:

```javascript
'new_disease_key': {
    name: { en: 'English Name', ta: 'Tamil Name' },
    severity: 'Low|Medium|High|None',
    pathogen: 'Scientific pathogen name',
    symptoms: {
        en: 'English description',
        ta: 'Tamil description'
    },
    treatment: {
        en: ['Step 1', 'Step 2', 'Step 3', ...],
        ta: ['படி 1', 'படி 2', 'படி 3', ...]
    },
    recovery: { en: 'X-Y days', ta: 'X-Y நாட்கள்' },
    prevention: {
        en: 'Prevention advice',
        ta: 'தடுப்பு ஆலோசனை'
    },
    source: 'Authoritative source reference'
}
```

Then update classification logic to map API results to your new key.

---

## Testing Guide

### Demo Mode Testing
1. Open index.html in browser
2. Click one of the 3 sample images (🍅, 🌾, ✅)
3. Should show instant, consistent results from database
4. Press Alt+D to toggle demo mode indicator visibility

### Real Classification Testing (Without API)
1. Disable demo mode or upload your own image
2. Click "Check Now"
3. Should see message: "Unable to identify - real classification requires Plant.id API key or loaded model"
4. This is expected without API key

### Real Classification Testing (With Plant.id API)
1. Get free API key: https://web.plant.id/
2. Set `PLANT_ID_API_KEY` variable in code
3. Upload a real plant disease photo
4. Wait 2-5 seconds for API response
5. Should see:
   - Matched disease from database
   - Confidence percentage
   - Detailed treatment steps in current language

### Cache Testing
1. Upload the same image twice
2. Second analysis should be instant (cached)
3. Check console: "Using cached result for image"

### Low Confidence Testing
1. Upload a blurry or unclear image
2. If confidence < 60%, should show:
   - Alert: "Unable to confidently identify - please consult a local agricultural officer"
   - No forced result displayed

---

## Configuration Options

### Confidence Threshold
Default: 60% (0.60)
```javascript
const CONFIDENCE_THRESHOLD = 0.60; // Adjust as needed
```
- Lower = more results, less accurate
- Higher = fewer results, more accurate
- Recommended range: 0.50 - 0.70

### Image Cache Size
Currently unlimited (Map object). To limit:
```javascript
if (imageCache.size > 100) {
    const firstKey = imageCache.keys().next().value;
    imageCache.delete(firstKey);
}
```

### Demo Mode Default
```javascript
let demoMode = true; // Change to false for production
```

---

## Troubleshooting

### "Unable to identify" Every Time
**Cause:** No API key set and no local model loaded
**Fix:** Set `PLANT_ID_API_KEY` or implement TensorFlow.js model

### API Error: 401 Unauthorized
**Cause:** Invalid or expired API key
**Fix:** Regenerate key at https://web.plant.id/

### API Error: 429 Too Many Requests
**Cause:** Exceeded rate limit
**Fix:** Upgrade plan or implement request throttling

### Image Hash Collisions
**Cause:** Rare hash function collision (same hash for different images)
**Fix:** Use better hash (e.g., SHA-256) or add image size to hash

### Wrong Disease Detected
**Cause:** 
1. Plant.id doesn't have disease in training data
2. Mapping logic doesn't match API response
3. Image quality too low

**Fix:**
1. Check Plant.id response in console logs
2. Update disease mapping in `classifyWithPlantId()`
3. Add image quality check

### Demo Samples Not Working
**Cause:** `sampleType` parameter not passed correctly
**Fix:** Check `loadSampleImage()` calls `analyzeImage(type)` with correct type

---

## Future Enhancements

### High Priority
1. **Local TensorFlow.js Model**
   - Train on PlantVillage dataset
   - Deploy for offline usage
   - Target accuracy: 85%+

2. **Multi-Disease Detection**
   - Current: single disease per image
   - Future: detect multiple diseases on same plant

3. **Disease Progression Tracking**
   - Save analysis history
   - Track treatment effectiveness
   - Generate insights over time

### Medium Priority
4. **Expanded Disease Database**
   - Current: 6 diseases
   - Target: 50+ diseases covering all major Tamil Nadu crops

5. **Regional Disease Outbreak Integration**
   - Combine with Regional Analytics tab
   - Show if detected disease matches current outbreak
   - Priority alerts

6. **Severity Estimation**
   - Beyond "High/Medium/Low"
   - Percentage of affected area
   - Yield loss estimates

### Low Priority
7. **Image Quality Feedback**
   - Check brightness, focus, resolution
   - Guide user: "Move closer", "More light needed"

8. **Pest Detection**
   - Beyond diseases
   - Identify insects, nutrient deficiencies

---

## References

### Data Sources
- ICAR-IIHR (Indian Institute of Horticultural Research): Vegetable pathology guidelines
- TNAU Agritech Portal: Disease management protocols for Tamil Nadu crops
- ICAR-CPRI (Central Potato Research Institute): Disease management
- ICAR-IIRR (Indian Institute of Rice Research): Rice disease protocols
- PlantVillage Dataset: Public disease image dataset

### APIs & Tools
- Plant.id API: https://web.plant.id/
- TensorFlow.js: https://www.tensorflow.org/js
- PlantVillage Dataset: https://github.com/spMohanty/PlantVillage-Dataset

### Agricultural Resources
- ICAR (Indian Council of Agricultural Research): https://icar.org.in/
- TNAU (Tamil Nadu Agricultural University): https://tnau.ac.in/
- Krishi Vigyan Kendra Network: Local extension services

---

## Support & Contact

For technical issues with classification:
1. Check console logs for detailed error messages
2. Verify API key is set correctly
3. Test with sample images first
4. Review troubleshooting section above

For agricultural/disease data questions:
1. Consult local Krishi Vigyan Kendra
2. Contact TNAU extension services
3. Review source references in disease database

---

**Last Updated:** 2026-07-26  
**Implementation Status:** Phase 1 Complete (Database + API Integration)  
**Next Phase:** TensorFlow.js Local Model Training & Deployment
