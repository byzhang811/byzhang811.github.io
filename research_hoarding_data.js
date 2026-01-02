// research_hoarding_data.js

const projectData = {
    title: "Multi-Modal Fusion for Robust Assessment of Hoarding Clutter",
    metaInfo: "Independent Researcher | Sept. 2024 – Present <br> Instructed by Prof. Janusz Konrad",
    
    links: [
        { text: "GitHub", url: "#", icon: "fab fa-github" },
        // 新增 Poster 链接 (请确保你把 PDF 放在了 pdf/ 文件夹里)
        { text: "Poster", url: "pdf/Hoarding_Poster.pdf", icon: "fas fa-image" },
    ],

    abstract: "Building on <a href='pdf/EUSIPCO_2025.pdf' target='_blank' rel='noopener'>Sun et al., 2025 (EUSIPCO)</a> . By strengthening the ViT baseline (partial transformer unfreezing and a more effective training setup), I achieved a <b>+4.8% CCR</b> gain with about <b>+0.7% CCR-1</b> improvement. Since clutter level is strongly correlated with structural complexity, I further introduced a lightweight structure-aware proxy using <b>gradient operators (Sobel/Scharr)</b> to extract edge/gradient cues. Building on this idea, I explored a <b>YOLOV8-based detection proxy</b> (e.g., low-dimensional detection statistics) and late fusion with ViT, leading to an overall improvement of <b>+6.73% CCR</b> and <b>+1.96% CCR-1</b> over the original reproduction. ",

    figure: {
        src: "images/Hoarding.png", // 记得换成你的架构图
        caption: "Figure 1: The Multi-Modal Fusion Architecture."
    },

    details: [
        { type: "h3", content: "ViT Backbone Optimization" },
        {
        type: "html",
        content: `
            <p>
            The original paper keeps the ViT backbone <b>fully frozen</b>, which limits the model’s capacity to adapt:
            the classifier can only re-weight fixed ImageNet features, while hoarding clutter recognition depends on
            <b>scene-level structure and global disorder patterns</b> that may not be well captured without domain adaptation.
            To improve representation power, we partially fine-tune the backbone by <b>unfreezing only the last 6 transformer blocks</b>.
            </p>

            <p>
            We do <b>not</b> fine-tune all ViT blocks because the dataset size is limited
            (<a href="https://vip.bu.edu/projects/social/hoarding-2025-dataset/" target="_blank" rel="noopener">HINDER-2025 dataset</a>), and updating the entire backbone can easily lead to
            <b>overfitting</b> and unstable training. Instead, we use <b>parameter-group learning rates</b>:
            the MLP head learns faster (<b>lr_mlp = 3e-4</b>) to quickly fit the task-specific decision boundary, while the large ViT
            blocks update more conservatively (<b>lr_vit = 2e-5</b>) to avoid destroying pretrained knowledge.
            Finally, we replace SGD with <b>AdamW</b>, which is more suitable for transformer optimization and works naturally with
            grouped learning rates.
            </p>
        `
        },
        { type: "img", src: "images/Hoarding_ViT_Only.png", caption: "Figure 2: ViT-Backbone Optimization." },
        { type: "p", content: "We replace StepLR with a Cosine scheduler for smoother learning-rate decay. Unlike StepLR’s abrupt drops, Cosine gradually anneals the learning rate for both the MLP head and the ViT backbone, which helps stabilize fine-tuning and improves convergence." },
        { type: "img", src: "images/Hoarding_Scheduler.png", caption: "Figure 3: StepLR VS. Cosine Scheduler." },

        { type: "h3", content: "Structural Feature Extraction and Fusion" },

        { type: "p", content: "Clutter level is strongly related to structural complexity (dense edges, occlusions, fragmented boundaries), which is not always fully captured by semantics-only features from a ViT." },

        { type: "h4", content: "Sobel/Scharr Gradient Proxy (2D Features)" },
        { type: "p", content: "Sobel/Scharr are lightweight, parameter-free gradient operators that convert an image into an edge/gradient map. We summarize this structure signal into a compact 2D proxy feature, providing a stable “messiness” cue without adding extra trainable parameters (helpful under limited data)." },

        { type: "h4", content: "YOLOv8 Detection Statistics (2D Features)" },
        { type: "p", content: "A pretrained YOLOv8 detector provides complementary object-level structure. We extract 2D statistics such as box count and area coverage ratio, which reflect how crowded/occluded the scene is and remain informative even when the training set is small." },

        { type: "p", content: "These structural logits are late-fused with the ViT logits to improve robustness and reduce large-step misclassifications, benefiting both CCR and CCR-1." },

        { type: "img", src: "images/Hoarding_Proxy.png", caption: "Figure 3: Sobel/Scharr proxy cues and YOLOv8-based structural statistics for late fusion." },

        // --- 新增：实验结果表格 ---
        { type: "h3", content: "Quantitative Results" },
        { type: "p", content: "The table below demonstrates the incremental improvements achieved by each component:" },
        
        // 这里我们用 'html' 类型，直接放表格代码
        {
        type: "html",
        content: `
            <style>
            /* 只影响这张表 */
            .academic-table th, .academic-table td{
                padding: 18px 18px;     /* 松散一点 */
                line-height: 1.6;
                vertical-align: middle;
                font-size: 18px;
                color: #000;            /* ✅ 全黑 */
                font-weight: 400;       /* ✅ 默认不加粗 */
            }
            .academic-table th{
                font-weight: 600;       /* 表头稍微粗一点更清晰（如果你也不想粗，把600改400） */
            }
            .academic-table .stage3 td{
                font-weight: 800;       /* ✅ 仅 Stage 3 加粗 */
            }
            </style>

            <div class="table-container">
            <table class="academic-table" style="width:100%;">
                <thead>
                <tr>
                    <th style="width:20%;">Stage</th>
                    <th style="width:42%;">Key Change</th>
                    <th style="width:10%;">CCR</th>
                    <th style="width:10%;">&#916;CCR</th>
                    <th style="width:10%;">CCR-1</th>
                    <th style="width:10%;">&#916;CCR-1</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>Sun et al., [2025]</td>
                    <td style="text-align:center;">N/A</td>
                    <td>53.46%</td>
                    <td style="text-align:center;">—</td>
                    <td>93.24%</td>
                    <td style="text-align:center;">—</td>
                </tr>

                <tr>
                    <td>Stage 1</td>
                    <td style="text-align:center;">Soft aug + Cosine + AdamW + Unfreeze 6</td>
                    <td>58.23%</td>
                    <td>+4.77%</td>
                    <td>93.94%</td>
                    <td>+0.70%</td>
                </tr>

                <tr>
                    <td>Stage 2</td>
                    <td style="text-align:center;">Stage 1 + Sobel Operator</td>
                    <td>59.30%</td>
                    <td>+5.84%</td>
                    <td>94.48%</td>
                    <td>+1.24%</td>
                </tr>

                <!-- ✅ 只有这一行加粗，其他全部黑色不加粗 -->
                <tr class="stage3">
                    <td>Stage 3</td>
                    <td style="text-align:center;">Stage 1 + YOLOv8n (Frozen)</td>
                    <td>60.19%</td>
                    <td>+6.73%</td>
                    <td>95.20%</td>
                    <td>+1.96%</td>
                </tr>
                </tbody>
            </table>
            </div>
        `
        },



        { type: "p", content: "As shown above, the final fusion model achieves the best performance." }
    ]
};