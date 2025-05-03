
const scanBtn = document.getElementById('scan-btn');
const uploadBtn = document.getElementById('upload-btn');
const scannerPreview = document.getElementById('scanner-preview');
let stream = null;


const translations = {
    en: {
        navtitle: "Smart Waste Segregation & Recycling Assistant",
        navClassify: "Classify Waste",
        navRecycle: "Recycling Centers",
        navDiy: "DIY Recycling",
        languageLabel: "Select Language:",
        scanBtn: "Scan",
        welcomeText: "Make Waste Management Smarter!",
        description: "Identify waste categories, find nearby recycling centers, and learn creative DIY recycling ideas.",
        startBtn: "Start Now",
        footerText: "© 2025 Smart Waste Management. All rights reserved."
    },
    hi: {
        navtitle: "स्मार्ट अपशिष्ट वर्गीकरण और पुनर्चक्रण सहायक",
        navClassify: "अपशिष्ट वर्गीकरण",
        navRecycle: "पुनर्चक्रण केंद्र",
        navDiy: "डू-इट-योरसेल्फ पुनर्चक्रण",
        languageLabel: "भाषा चुनें:",
        scanBtn: "स्कैन",
        welcomeText: "अपशिष्ट प्रबंधन को स्मार्ट बनाएं!",
        description: "अपशिष्ट श्रेणियों की पहचान करें, निकटवर्ती पुनर्चक्रण केंद्र खोजें, और रचनात्मक डू-इट-योरसेल्फ पुनर्चक्रण विचार सीखें।",
        startBtn: "अभी शुरू करें",
        footerText: "© 2025 स्मार्ट अपशिष्ट प्रबंधन। सर्वाधिकार सुरक्षित।"
    },
    ta: {
        navtitle: "ஸ்மார்ட் கழிவு பிரித்தல் மற்றும் மறுசுழற்சி உதவியாளர்",
        navClassify: "கழிவு வகைப்படுத்தல்",
        navRecycle: "மறுசுழற்சி மையங்கள்",
        navDiy: "DIY மறுசுழற்சி",
        languageLabel: "மொழியைத் தேர்ந்தெடுக்கவும்:",
        scanBtn: "ஸ்கேன்",
        welcomeText: "கழிவு மேலாண்மையை ஸ்மார்ட் ஆக்குங்கள்!",
        description: "கழிவு வகைகளை அடையாளம் கண்டறியவும், அருகிலுள்ள மறுசுழற்சி மையங்களைக் கண்டறியவும், மற்றும் படைப்பாற்றல் DIY மறுசுழற்சி யோசனைகளைக் கற்றுக்கொள்ளவும்.",
        startBtn: "இப்போது தொடங்குங்கள்",
        footerText: "© 2025 ஸ்மார்ட் கழிவு மேலாண்மை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    },
    bn: {
        navtitle: "স্মার্ট বর্জ্য পৃথকীকরণ ও পুনর্ব্যবহার সহকারী",
        navClassify: "বর্জ্য শ্রেণীবদ্ধকরণ",
        navRecycle: "পুনর্ব্যবহার কেন্দ্র",
        navDiy: "DIY পুনর্ব্যবহার",
        languageLabel: "ভাষা নির্বাচন করুন:",
        scanBtn: "স্ক্যান",
        welcomeText: "বর্জ্য ব্যবস্থাপনাকে স্মার্ট করুন!",
        description: "বর্জ্য বিভাগগুলি চিহ্নিত করুন, কাছাকাছি পুনর্ব্যবহার কেন্দ্র খুঁজুন এবং সৃজনশীল DIY পুনর্ব্যবহার ধারণা শিখুন।",
        startBtn: "এখনই শুরু করুন",
        footerText: "© 2025 স্মার্ট বর্জ্য ব্যবস্থাপনা। সর্বস্বত্ব সংরক্ষিত।"
    },
    te: {
        navtitle: "స్మార్ట్ వేస్ట్ సెగ్రిగేషన్ & రీసైక్లింగ్ అసిస్టెంట్",
        navClassify: "వేస్ట్ క్లాసిఫికేషన్",
        navRecycle: "రీసైక్లింగ్ సెంటర్స్",
        navDiy: "DIY రీసైక్లింగ్",
        languageLabel: "భాషను ఎంచుకోండి:",
        scanBtn: "స్కాన్",
        welcomeText: "వేస్ట్ మేనేజ్‌మెంట్‌ని స్మార్ట్‌గా మార్చండి!",
        description: "వేస్ట్ వర్గాలను గుర్తించండి, సమీప రీసైక్లింగ్ సెంటర్లను కనుగొనండి మరియు క్రియాత్మక DIY రీసైక్లింగ్ ఆలోచనలను నేర్చుకోండి.",
        startBtn: "ఇప్పుడే ప్రారంభించండి",
        footerText: "© 2025 స్మార్ట్ వేస్ట్ మేనేజ్‌మెంట్. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి."
    },
    kn: {
        navtitle: "ಸ್ಮಾರ್ಟ್ ತ್ಯಾಜ್ಯ ವರ್ಗೀಕರಣ ಮತ್ತು ಮರುಬಳಕೆ ಸಹಾಯಕ",
        navClassify: "ತ್ಯಾಜ್ಯ ವರ್ಗೀಕರಣ",
        navRecycle: "ಮರುಬಳಕೆ ಕೇಂದ್ರಗಳು",
        navDiy: "DIY ಮರುಬಳಕೆ",
        languageLabel: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
        scanBtn: "ಸ್ಕ್ಯಾನ್",
        welcomeText: "ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆಯನ್ನು ಸ್ಮಾರ್ಟ್ ಆಗಿ ಮಾಡಿ!",
        description: "ತ್ಯಾಜ್ಯ ವರ್ಗಗಳನ್ನು ಗುರ్ತಿಸಿ, ಹತ್ತಿರದ ಮರುಬಳಕೆ ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಸೃಜನಶೀಲ DIY ಮರುಬಳಕೆ ಕಲ್ಪನೆಗಳನ್ನು ಕಲಿಯಿರಿ.",
        startBtn: "ಈಗಲೇ ಪ్ರಾರಂಭಿಸಿ",
        footerText: "© 2025 ಸ್ಮಾರ್ಟ್ ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ."
    }
};


function changeLanguage(language) {
    
    document.getElementById('title').textContent = translations[language].title;
    document.getElementById('nav-classify').textContent = translations[language].navClassify;
    document.getElementById('nav-recycle').textContent = translations[language].navRecycle;
    document.getElementById('nav-diy').textContent = translations[language].navDiy;
    document.getElementById('language-label').textContent = translations[language].languageLabel;
    document.getElementById('scan-btn').textContent = translations[language].scanBtn;
    document.getElementById('welcome-text').textContent = translations[language].welcomeText;
    document.getElementById('description').textContent = translations[language].description;
    document.getElementById('start-btn').textContent = translations[language].startBtn;
    document.getElementById('footer-text').textContent = translations[language].footerText;

    
    localStorage.setItem('preferredLanguage', language);
}


function getPreferredLanguage() {
    
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
        return storedLanguage;
    }

    
    const browserLanguage = navigator.language.split('-')[0];
    if (translations[browserLanguage]) {
        return browserLanguage;
    }

    
    return 'en';
}


document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = getPreferredLanguage();
    changeLanguage(preferredLanguage);
    
    
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = preferredLanguage;
    }
})
scanBtn.addEventListener('click', async () => {
    try {
        if (stream) {
    
            stopScanning();
            scanBtn.textContent = 'Scan';
        } else {
            
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            scannerPreview.srcObject = stream;
            scanBtn.textContent = 'Stop Scan';
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please ensure you have granted camera permissions.');
    }
});


uploadBtn.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                scannerPreview.src = e.target.result;
                
                processImage(file);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }
});


function stopScanning() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
        scannerPreview.srcObject = null;
    }
}


async function processImage(file) {
    try {
        scanBtn.textContent = 'Processing...';
        
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        
        scanBtn.textContent = 'Scan';
        
        
        
    } catch (error) {
        console.error('Error processing image:', error);
        alert('Error processing image. Please try again.');
        scanBtn.textContent = 'Scan';
    }
}


window.addEventListener('beforeunload', () => {
    stopScanning();
});


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        scanBtn.click();
    }
});