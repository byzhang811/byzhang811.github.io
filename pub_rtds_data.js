// pub_rtds_data.js
const rtdsData = {
  // Title & meta
  title: "RTDS: A Robust Two-Stage Tongue Diagnosis System with U-Net++ Segmentation and Swin-Hybrid Classification",
  authors: "<strong>Boyang Zhang</strong>",
  venue: "Submitted to SIVP (Under Review), 2025",

  // Links
  links: [
    { text: "PDF (Draft)", url: "pdf/RTDS_SIVP.pdf", icon: "fas fa-file-pdf" },
    { text: "GitHub", url: "https://github.com/byzhang811/RTDS-Tongue_Analysis", icon: "fab fa-github" }
  ],

  // Abstract (a bit richer, still web-friendly)
  abstract:
    "We present RTDS, a two-stage tongue diagnosis framework tailored for real outpatient acquisition, where complex backgrounds, uneven illumination, and label ambiguity commonly degrade model reliability. " +
    "RTDS explicitly decouples localization from diagnosis: Stage 1 employs U-Net++ to segment the tongue region of interest (ROI) for background suppression and input standardization, while Stage 2 adopts a Swin-Hybrid classifier to jointly capture fine-grained local textures (e.g., cracks, tooth marks, coating patterns) and global contextual cues. " +
    "This design improves robustness under non-ideal clinical conditions and reduces sensitivity to spurious background correlations. " +
    "Experiments on 2,100 in situ tongue images demonstrate strong diagnostic performance and consistent gains over representative CNN and Transformer baselines.",

  // Main figure (leave empty for placeholder on the page)
  // NOTE: no "Figures" section title needed in the page; place it directly under Abstract.
  figure: {
    src: "images/RTDS_Framework.png",
    caption: ""   // keep empty for now; you’ll provide the caption later
  },

  // Details (slightly expanded, still not too long)
  details: [
    { type: "h3", content: "Overview" },
    { type: "p", content:
      "RTDS is designed for practical clinical deployment rather than curated lab captures. The core idea is to separate “where to look” (tongue ROI extraction) from “what it means” (diagnosis), making the system less vulnerable to background clutter, illumination changes, and acquisition noise." },

    { type: "h3", content: "Problem Setting" },
    { type: "p", content:
      "Real outpatient tongue images exhibit large domain variance: inconsistent camera distance, lighting reflections, partial occlusions, and heterogeneous backgrounds. These factors often cause end-to-end classifiers to overfit to non-diagnostic cues. RTDS addresses this by enforcing ROI-focused inference through an explicit segmentation stage." },

    { type: "h3", content: "Stage 1: U-Net++ Segmentation" },
    { type: "p", content:
      "We use a U-Net++ based segmentation module to produce a high-quality tongue mask and ROI crop. This step suppresses background distractors and standardizes geometry/scale, improving downstream generalization. The segmentation output also supports more interpretable error analysis by making attention consistently ROI-centered." },

    { type: "h3", content: "Stage 2: Swin-Hybrid Classification" },
    { type: "p", content:
      "The classifier is a Swin-Hybrid architecture that combines convolutional inductive bias for local textures with Transformer-style global context modeling. CNN components emphasize fine-grained patterns, while Swin-style windowed attention aggregates mid- to long-range dependencies with improved efficiency and stability." },

    { type: "h3", content: "Training & Evaluation" },
    { type: "p", content:
      "We evaluate RTDS on a proprietary dataset of 2,100 in situ tongue images under consistent training protocols. Comparisons include representative CNN baselines and Transformer variants. We report diagnostic performance and robustness trends under real-world acquisition variability." },

    { type: "h3", content: "Results" },
    { type: "p", content:
      "RTDS achieves strong diagnostic accuracy and robustness improvements over standard baselines. The two-stage design is especially beneficial in challenging cases where background clutter or illumination artifacts would otherwise dominate feature learning." },

    { type: "h3", content: "Ablation & Analysis" },
    { type: "p", content:
      "We conduct controlled ablations to quantify the contribution of ROI segmentation, hybrid modeling, and key design choices. Additional analysis examines failure modes and the extent to which performance gains come from reduced reliance on spurious context." },

    { type: "h3", content: "Interpretability" },
    { type: "p", content:
      "We provide interpretability-driven diagnostics (e.g., ROI-consistent attention/activation patterns) to verify that the model’s decisions are driven by clinically relevant tongue regions rather than background artifacts." },

    { type: "h3", content: "Limitations & Future Work" },
    { type: "p", content:
      "We discuss limitations including dataset diversity and potential domain shifts across collection sites. Future work includes multi-center validation, calibration for clinical decision support, and multimodal extensions that incorporate structured metadata when available." }
  ]
};
