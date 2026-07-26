const PLANT_PROBLEMS_DATABASE = {
    'tomato_bacterial_spot': {
        problemType: { en: 'Bacterial Disease', ta: 'பாக்டீரியா நோய்' },
        name: { en: 'Tomato Bacterial Spot', ta: 'தக்காளி பாக்டீரியா புள்ளி' },
        affectedPart: { en: 'Leaves & Fruit', ta: 'இலைகள் & பழங்கள்' },
        rootCause: { 
            en: 'Caused by Xanthomonas bacteria spreading in warm, wet conditions', 
            ta: 'வெதுவெதுப்பான, ஈரமான நிலையில் சாந்தோமோனாஸ் பாக்டீரியா பரவுவதால் ஏற்படுகிறது'
        },
        severity: 'High',
        recommendation: {
            organic: { en: 'Copper-based bactericide spray (e.g. Kocide 3000)', ta: 'தாமிர அடிப்படையிலான பாக்டீரியா கொல்லி தெளிப்பு' },
            chemical: { en: 'Streptomycin sulphate', ta: 'ஸ்ட்ரெப்டோமைசின் சல்பேட்' },
            dosage: { en: '2g per liter of water, spray every 7 days', ta: 'ஒரு லிட்டர் தண்ணீருக்கு 2 கிராம், 7 நாட்களுக்கு ஒரு முறை தெளிக்கவும்' },
            safetyNote: { en: 'Wear mask while spraying; do not harvest for 5 days after spray', ta: 'தெளிக்கும் போது முகமூடி அணியவும்; தெளித்த 5 நாட்களுக்கு அறுவடை செய்ய வேண்டாம்' }
        }
    },
    'nitrogen_deficiency': {
        problemType: { en: 'Nutrient Deficiency', ta: 'ஊட்டச்சத்து குறைபாடு' },
        name: { en: 'Nitrogen Deficiency', ta: 'நைட்ரஜன் குறைபாடு' },
        affectedPart: { en: 'Older Leaves', ta: 'பழைய இலைகள்' },
        rootCause: { 
            en: 'Soil lacking sufficient nitrogen, often due to leaching or poor organic matter', 
            ta: 'மண்ணில் போதுமான நைட்ரஜன் இல்லை, பெரும்பாலும் கசிவு அல்லது மோசமான கரிமப் பொருட்களால் ஏற்படுகிறது'
        },
        severity: 'Medium',
        recommendation: {
            organic: { en: 'Vermicompost or Neem Cake', ta: 'மண்புழு உரம் அல்லது வேப்பம் புண்ணாக்கு' },
            chemical: { en: 'Urea (46% N)', ta: 'யூரியா (46% N)' },
            dosage: { en: '50 kg per acre as top dressing', ta: 'ஏக்கருக்கு 50 கிலோ மேல் உரமாக இடவும்' },
            safetyNote: { en: 'Apply when soil is moist; avoid direct contact with plant stems', ta: 'மண் ஈரமாக இருக்கும் போது இடவும்; செடியின் தண்டுகளுடன் நேரடி தொடர்பைத் தவிர்க்கவும்' }
        }
    },
    'fall_armyworm': {
        problemType: { en: 'Pest Damage', ta: 'பூச்சி சேதம்' },
        name: { en: 'Fall Armyworm', ta: 'படைப்புழு' },
        affectedPart: { en: 'Leaves & Whorl', ta: 'இலைகள் & குருத்து' },
        rootCause: { 
            en: 'Caterpillar feeding on young leaves and central whorl of the plant', 
            ta: 'இளம் இலைகள் மற்றும் செடியின் மையக் குருத்தை உண்ணும் புழு'
        },
        severity: 'High',
        recommendation: {
            organic: { en: 'Neem seed kernel extract (NSKE 5%)', ta: 'வேப்பங்கொட்டை சாறு (NSKE 5%)' },
            chemical: { en: 'Emamectin Benzoate 5% SG', ta: 'எமாமெக்டின் பென்சோயேட் 5% SG' },
            dosage: { en: '0.4g per liter of water, direct spray into whorl', ta: 'ஒரு லிட்டர் தண்ணீருக்கு 0.4 கிராம், குருத்தில் நேரடியாகத் தெளிக்கவும்' },
            safetyNote: { en: 'Spray in early morning or late evening; use protective clothing', ta: 'அதிகாலை அல்லது மாலை தாமதமாக தெளிக்கவும்; பாதுகாப்பு ஆடைகளைப் பயன்படுத்தவும்' }
        }
    },
    'healthy': {
        problemType: { en: 'Healthy', ta: 'ஆரோக்கியம்' },
        name: { en: 'Healthy Plant', ta: 'ஆரோக்கியமான செடி' },
        affectedPart: { en: 'Whole Plant', ta: 'முழு செடி' },
        rootCause: { 
            en: 'Optimal soil nutrition, proper watering, and good pest management', 
            ta: 'உகந்த மண் ஊட்டச்சத்து, சரியான நீர்ப்பாசனம் மற்றும் நல்ல பூச்சி மேலாண்மை'
        },
        severity: 'None',
        recommendation: {
            organic: { en: 'Maintain current organic practices', ta: 'தற்போதைய இயற்கை முறைகளை தொடரவும்' },
            chemical: { en: 'Standard preventive care', ta: 'வழக்கமான தடுப்பு பராமரிப்பு' },
            dosage: { en: 'Follow standard crop schedule', ta: 'வழக்கமான பயிர் அட்டவணையைப் பின்பற்றவும்' },
            safetyNote: { en: 'Continue regular field monitoring', ta: 'தொடர்ந்து வயலைக் கண்காணிக்கவும்' }
        }
    }
};
