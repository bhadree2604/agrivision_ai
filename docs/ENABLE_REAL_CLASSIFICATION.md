# Enable Real Plant Disease Classification

## Quick Start (5 Minutes)

AgriVision AI now supports **real plant disease classification** instead of mock results! Follow these simple steps to activate it:

---

## Option 1: Plant.id API (Recommended - Easy Setup)

### Step 1: Get Free API Key
1. Visit https://web.plant.id/
2. Sign up for a free account
3. Navigate to API settings
4. Copy your API key (looks like: `abc123xyz456...`)

### Step 2: Add Key to AgriVision AI
1. Open `index.html` in a text editor (VS Code, Notepad++, etc.)
2. Find line ~786 (search for `PLANT_ID_API_KEY`)
3. Replace the empty string with your key:
   ```javascript
   const PLANT_ID_API_KEY = 'your-api-key-here'; // Paste your key here
   ```
4. Save the file

### Step 3: Test It!
1. Open `index.html` in your browser
2. Upload a real plant disease photo (or use your phone camera)
3. Click "Check Now" / "இப்போது சரிபார்"
4. Wait 2-5 seconds for analysis
5. See real disease detection with detailed treatment steps!

**That's it!** Your app now uses real AI classification.

---

## Option 2: Local TensorFlow.js Model (Advanced - Offline Support)

### Requirements
- Machine learning knowledge
- Python environment
- Training data (PlantVillage dataset)

### Steps Overview
1. **Get Training Data**
   - Download PlantVillage dataset: https://github.com/spMohanty/PlantVillage-Dataset
   - Focus on diseases in `DISEASE_DATABASE` (tomato/rice diseases)

2. **Train Model**
   - Use TensorFlow/Keras to train MobileNetV2 model
   - Target input size: 224x224 RGB images
   - Export to TensorFlow.js format

3. **Deploy Model**
   - Place model files in `/models/plant-disease/` folder:
     - `model.json` (architecture)
     - `group1-shard1of1.bin` (weights)
   
4. **Update Code**
   - In `classifyPlantDisease()` function (line ~870), uncomment:
     ```javascript
     // Load model (do this once at startup)
     if (!classificationModel) {
         classificationModel = await tf.loadGraphModel('/models/plant-disease/model.json');
     }
     
     // Run inference
     const tensor = tf.browser.fromPixels(canvas).expandDims(0).div(255.0);
     const predictions = await classificationModel.predict(tensor).data();
     
     // Map predictions to disease keys
     const diseaseKeys = ['tomato_bacterial_spot', 'tomato_early_blight', 'tomato_late_blight', 
                          'rice_blast', 'rice_bacterial_blight', 'healthy'];
     const maxIndex = predictions.indexOf(Math.max(...predictions));
     const confidence = predictions[maxIndex] * 100;
     
     if (confidence < CONFIDENCE_THRESHOLD * 100) {
         return { diseaseKey: null, confidence: confidence, message: {...} };
     }
     
     return { diseaseKey: diseaseKeys[maxIndex], confidence: confidence };
     ```

5. **Test Locally**
   - Must serve via local web server (not `file://` protocol)
   - Example: `python -m http.server 8000` or use Live Server extension

**Advantages:** Works offline, no API costs, faster inference  
**Disadvantages:** Requires ML expertise, model training time, ~10MB download

---

## How It Works

### Current State (Without Setup)
- ✅ Demo mode works perfectly with 3 sample images
- ❌ Real uploaded images show: "Unable to identify - requires API key or model"

### After Setup (With Plant.id API)
- ✅ Demo mode still works
- ✅ Real uploaded images get analyzed by cloud AI
- ✅ Returns disease name, confidence, treatment steps from database

### After Setup (With Local Model)
- ✅ Demo mode still works
- ✅ Real uploaded images analyzed locally (offline)
- ✅ Faster results, no internet needed

---

## Features Already Implemented

### ✅ Comprehensive Disease Database
6 diseases with treatment protocols from ICAR/TNAU:
- Tomato Bacterial Spot
- Tomato Early Blight
- Tomato Late Blight
- Rice Blast
- Rice Bacterial Blight
- Healthy Plant

### ✅ Bilingual Treatment Steps
All disease info in English & Tamil (தமிழ்)

### ✅ Confidence Threshold
Only shows results with 60%+ confidence. Low confidence = honest "unable to identify" message.

### ✅ Deterministic Results
Same image always returns same result (cached).

### ✅ Demo Mode Preserved
3 sample images (🍅 🌾 ✅) work instantly for symposium demos.

---

## Testing Your Setup

### Test 1: Demo Mode (Should Always Work)
1. Open app
2. Click one of the 3 sample image boxes (🍅, 🌾, ✅)
3. Should instantly show disease info from database
4. ✅ Pass if results appear

### Test 2: Real Classification (After API Setup)
1. Find a plant disease photo online (Google: "tomato late blight")
2. Upload to app via "Tap to Take Photo" button
3. Click "Check Now"
4. Wait 2-5 seconds
5. ✅ Pass if disease name + treatment steps appear

### Test 3: Cache (After API Setup)
1. Upload an image and analyze it
2. Click "Check Now" again (same image)
3. Should be instant (< 0.5 seconds)
4. Check browser console: "Using cached result for image"
5. ✅ Pass if second analysis is instant

### Test 4: Low Confidence
1. Upload a blurry/unclear image
2. Click "Check Now"
3. Should show alert: "Unable to confidently identify - please consult..."
4. ✅ Pass if honest message appears (not forced guess)

---

## Troubleshooting

### Problem: "Unable to identify" on every real image
**Solution:** API key not set or invalid. Verify `PLANT_ID_API_KEY` has your actual key.

### Problem: API error 401
**Solution:** Invalid API key. Regenerate at https://web.plant.id/

### Problem: API error 429
**Solution:** Rate limit exceeded. Wait or upgrade plan.

### Problem: Demo samples not working
**Solution:** This shouldn't happen - demo mode is independent. Check browser console for errors.

### Problem: Results in wrong language
**Solution:** Click "English ⇄ தமிழ்" button in header to toggle.

---

## Cost Information

### Plant.id API Pricing (as of 2024)
- **Free Tier:** 100 requests/month
- **Hobby:** $9/month - 1,000 requests
- **Professional:** $49/month - 10,000 requests
- Check current pricing: https://web.plant.id/pricing

For symposium/demo: Free tier (100 requests) is plenty!

### Local Model
- **Training:** Free (if you have GPU) or $10-50 on cloud (Colab Pro, AWS)
- **Deployment:** Free (served from your own files)
- **Ongoing:** $0 (no API calls)

---

## Next Steps

1. **For Symposium/Demo:** Keep demo mode enabled, no setup needed
2. **For Testing Real Classification:** Set up Plant.id API key (5 minutes)
3. **For Production Deployment:** Consider local model for cost/offline support
4. **For More Diseases:** Add to `DISEASE_DATABASE` and update classification mapping

---

## Support Resources

- **Classification Setup:** See `CLASSIFICATION_GUIDE.md` (detailed technical docs)
- **UI/UX Guide:** See `FARMER_FRIENDLY_GUIDE.txt`
- **Deployment:** See `DEPLOY.md`
- **Quick Demo:** See `DEMO_CHECKLIST.md`

---

## Questions?

**Q: Do I need to do this for the symposium demo?**  
A: No! Demo mode works perfectly without any setup. Only needed for real photo analysis.

**Q: Will real classification work for all plant diseases?**  
A: Plant.id supports 30+ diseases. Our database has 6 mapped so far (common in Tamil Nadu). Unmapped diseases will show "unable to identify."

**Q: Can I use this offline?**  
A: Only with local TensorFlow.js model (Option 2). Plant.id API requires internet.

**Q: How accurate is it?**  
A: Plant.id typically 85-95% accurate. Local models 75-85% (depends on training data).

**Q: Can I add more diseases?**  
A: Yes! See "Adding New Diseases" section in `CLASSIFICATION_GUIDE.md`.

---

**Status:** Ready to enable real classification anytime!  
**Recommendation:** For symposium, keep demo mode. For real deployment, add Plant.id API key.
