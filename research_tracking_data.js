// research_tracking_data.js

const projectData = {
  title: "Multimodal Object Tracking for Intelligent Unmanned Systems",
  metaInfo:
    "Advisor-Supervised Research | Nov. 2025 – Present <br> Instructed by Dr. Weidai Xia",

  // ✅ No GitHub / Poster here
  links: [
    {
      text: "Benchmark Datasets",
      url: "https://pan.baidu.com/s/12ur7n1wSDvIWajPQJMd8Kg?pwd=AHUT",
      icon: "fas fa-database",
    },
  ],

  abstract:
    "As sensors such as thermal and event cameras become increasingly accessible, leveraging multi-source sensing is a practical way to improve perception reliability for intelligent unmanned systems. Our project focuses on how to fuse heterogeneous modalities effectively for robust object tracking, while building a pathway toward higher-level scene semantics (including 3D). We design a target-guided cross-modal interaction mechanism that emphasizes target-relevant context and suppresses background redundancy, and we adapt the fusion logic to event streams (change-driven, sparse signals) to better highlight informative regions.",

  // ✅ Keep one main banner image slot; you can replace later
  figure: {
    src: "images/multimodal_tracking_banner.png",
    caption:
      "Figure 1: Multimodal fusion pipeline for object tracking and scene semantics (placeholder).",
  },

details: [
  { type: "h3", content: "Background & Significance" },
  {
    type: "p",
    content:
      "In real deployments, single-modality sensing can be fragile. Multi-source sensing offers complementary cues, but naïve fusion often introduces redundant background noise and fails when one modality becomes weak or incomplete. The key research question is how to design fusion interactions that remain target-focused and robust under heterogeneous and fluctuating sensor quality.",
  },

  { type: "h3", content: "Core Idea: Target-Guided Cross-Modal Fusion" },
  {
    type: "p",
    content:
      "Instead of simply concatenating modality features, we build a target-guided interaction mechanism: a template (target prior) acts as a bridge to gather target-relevant context from the search region and distribute it back to strengthen discriminative tracking features. This interaction is designed to reduce background distractors and emphasize target-specific structure.",
  },

  // ✅ 图 2：放在“核心融合思想”之后
  {
    type: "img",
    src: "images/Object_Tracking_Fig2.png",
    caption:
      "Figure 1: Target-guided cross-modal interaction (gather → distribute) to suppress distractors.",
  },

  {
    type: "p",
    content:
      "We further tailor the fusion to event streams. Since event data is change-driven and sparse, it naturally reduces static redundancy and tends to emphasize motion/structure changes. The fusion logic is adapted so that event cues serve as an auxiliary signal that biases attention toward informative regions rather than injecting dense background texture.",
  },

  { type: "h3", content: "Current Progress" },
  {
    type: "html",
    content: `
      <ul>
        <li>Completed the high-level fusion design and implemented a minimal prototype skeleton to validate end-to-end data flow (template ↔ search interaction).</li>
        <li>Integrated event-stream cues as an auxiliary modality and defined how they enter the fusion pathway to reduce redundant background responses.</li>
        <li>Drafted the staged roadmap (RGB+Event → +Thermal → memory enhancement → semantics/3D) and corresponding evaluation plan.</li>
      </ul>
    `,
  },

  { type: "h3", content: "Roadmap (Planned)" },
  {
    type: "html",
    content: `
      <ol>
        <li><b>Evaluation & Ablations:</b> unify RGB–Event and RGB–Thermal settings; test fusion placements and interaction variants; analyze failure cases.</li>
        <li><b>Thermal Integration:</b> extend the interaction to include thermal cues with modality-quality awareness (robust when a modality degrades).</li>
        <li><b>Memory Enhancement:</b> add a lightweight associative memory component to improve long-term stability under occlusion, disappearance, and incomplete signals.</li>
        <li><b>Semantics & 3D:</b> introduce text semantics as a lightweight prior and connect tracking to 3D-aware scene semantics (environment understanding).</li>
      </ol>
    `,
  },

  // ✅ 图 3：放在 Roadmap 列表之后
  {
    type: "img",
    src: "images/Object_Tracking_Plan.png",
    caption:
      "Figure 3: Staged roadmap from multimodal fusion to semantics and 3D.",
  },
],
};
