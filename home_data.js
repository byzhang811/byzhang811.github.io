// home_data.js

const homeData = {
    header: {
        name: "Boyang Zhang",
        name_cn: "张博杨",
        title: "First-year M.S. Student",
        department: "Boston University, Department of Electrical and Computer Engineering",
        bio: [
            "Welcome to my website!",
            "I'm Boyang Zhang. Currently, I am a Master of Science student in Electrical and Computer Engineering at Boston University.",
            "Earlier, I earned my B.S & B.E.(double degree) and major in Software Engineering from Hubei University and Manchester Metropolitan University (Joint Institute).",
            "Feel free to send me an email if you are interested in my research or just want to chat!"
        ]
    },
    interests: [
        "Computer Vision",
        "Multimodal Fusion",
        "Robot Perception",
        "Image Processing",
        "Visual Object Tracking"
    ],
    education: [
        {
            period: "Sept. 2025 - Present",
            school: "Boston University (BU)",
            degree: "M.S. Student in Electrical and Computer Engineering",
            advisor: 'MS. Thesis & Project Advisor: <a href="https://sites.bu.edu/jkonrad/students/" target="_blank" rel="noopener noreferrer">Prof. Janusz Konrad</a>',
            details: ["GPA: 3.65/4.0", "Courses: MS Project, Deep Learning, Intro to Embedded Systems, Product design"] 
        },
        {
            period: "Sept. 2021 - Jun. 2025",
            school: "Hubei University & Manchester Metropolitan University",
            degree: "Bachelor of Engineering & Science in Software Engineering(double degree)",
            advisor: "Advisor: Prof. Lijun Xu & Prof. Chao Yang",
            details: ["Joint Institute Program"]
        },
        {
            period: "July. 2023 - Augest. 2025",
            school: "University of California, Berkeley",
            degree: "Non-degree Summer Program",
            details: ["GPA: 3.5/4.0", "Course: Prototype & Fabrication, Creative Programming & Electronics"]
        }
    ],
    work: [
        {
            period: "Jun. 2024 - Aug. 2024",
            company: "Wuhan WZZC Technology Co., Ltd.",
            role: "Algorithm Engineering Intern, Research Department",
            details: [
                "Deployed SAM (ViT-B) for an interactive platform; migrated PyTorch → ONNX Runtime with graph optimizations",
                "GPU profiling + FP16 inference tuning reduced p95 latency (210ms → 125ms) and stabilized VRAM usage (7.6GB → 5.9GB) under concurrency",
            ]
        },
        {
            period: "Apr. 2024 - Jun. 2024",
            company: "iSoftStone Technology Service Co., Ltd.",
            role: "Internship Team Lead, Algorithm Department",
            details: [
                "Built an end-to-end box-office forecasting pipeline (XGBoost/LightGBM): multi-source data cleaning → feature engineering → baseline evaluation",
                "Addressed year-to-year covariate shift; improved out-of-time MAE (0.162 → 0.138, -14.8%) via drift-aware feature redesign"
            ]
        },
        {
            period: "Jan. 2023 - Mar. 2023",
            company: "HQYJ Information Technology Co., Ltd.",
            role: "Intern, Machine Learning Department",
            details: [
                "Developed a lightweight 1D-CNN + GRU model for motion-state prediction from pose keypoints (17 joints), replacing a KNN baseline",
                "Built sliding-window time-series pipeline (1.0s window / 0.2s stride; 168k training windows) and diagnosed online jitter at action transitions",
                "Reduced boundary errors (9.4% → 6.1%) via explicit transition-state labeling + temporal smoothing for more stable real-time inference"
            ]
        }
    ],
    honors: [
        "First Prize, National College Student AI Technology Competition (top 10%, Aug 2024)",
        "First Prize, National College Student Innovation & Entrepreneurship Competition (top 20%, June 2024)",
        "Hubei University Scholarship for Academic Excellence (top 25%, 2024-2025)",
    ],
    footer: {
        text: "This homepage offers just a glimpse of who I am. If you'd like to know more, feel free to send me an email.",
        cvLink: "pdf/BoyangZhang_CV_1228.pdf"
    }
};
