(function () {
  if (window.__GENCAR_REVIEW_ADDON__) {
    return;
  }
  window.__GENCAR_REVIEW_ADDON__ = true;

  var STAGE_ORDER = ['PRD', 'DES', 'STD', 'STMD', 'VDR'];
  var SPECIALTY_OPTIONS = [
    { value: 'INTERIOR', label: '内饰' },
    { value: 'EXTERIOR', label: '外饰' },
    { value: 'CMF', label: 'CMF' },
    { value: 'STRATEGY', label: '策略' }
  ];
  var VIEW_MODES = [
    { value: 'GRID', label: '网格视图' },
    { value: 'SINGLE', label: '单图放大' },
    { value: 'COMPARE', label: '双图对比' },
    { value: 'MOSAIC', label: '多图整合' }
  ];
  var DECISION_OPTIONS = [
    { value: 'PASS', label: '通过' },
    { value: 'REVISE', label: '修改' },
    { value: 'REJECT', label: '否决' }
  ];
  var PARTICIPANTS = ['陈晨', '刘峰', '王嘉', '赵敏'];
  var CASE_PROMPT = '电动SUV概念设计外饰草图，强调整车比例、姿态与型面张力';
  var CASE_PROMPT_SHORT_CN = '一辆流线型电动SUV，未来主义风格，悬浮式车顶';
  var CASE_PROMPT_LONG_EN =
    'streamlined body profile, aerodynamic silhouette, flowing shoulder line, coupe-like roofline, smooth surface transitions, wind-cheating design, automotive design, professional concept art, high detail, photorealistic rendering, studio lighting, 8k quality';
  var CASE_PROMPT_KEYWORDS = [
    { word: 'streamlined', weight: 0.93 },
    { word: 'automotive design', weight: 0.87 },
    { word: 'professional concept', weight: 0.81 },
    { word: 'high detail', weight: 0.74 }
  ];
  var PAPER_HEATMAP_PROMPT =
    'streamlined body profile, aerodynamic silhouette, flowing shoulder line, coupe-like roofline, smooth surface transitions, wind-cheating design';
  var CASE_VIEW_IMAGES = {
    front: './assets/case-front.jpg',
    side: './assets/case-side.jpg',
    rear: './assets/case-rear.jpg'
  };
  var CASE_VIEW_LABELS = {
    front: '前视图',
    side: '侧视图',
    rear: '后视图'
  };
  var PAPER_HEATMAP_REGIONS = [
    {
      word: 'streamlined body profile',
      weight: 0.93,
      x: 47,
      y: 57,
      width: 34,
      height: 18,
      focus: '前舱到后轮的整体体量过渡',
      note: '主体体块连续性强，语义映射稳定。'
    },
    {
      word: 'aerodynamic silhouette',
      weight: 0.89,
      x: 42,
      y: 40,
      width: 24,
      height: 12,
      focus: '车头上缘到车顶的轮廓线',
      note: '上沿轮廓具备明显低阻姿态。'
    },
    {
      word: 'flowing shoulder line',
      weight: 0.86,
      x: 59,
      y: 51,
      width: 16,
      height: 10,
      focus: '翼子板后段至车门肩线',
      note: '肩线连接完整，曲率变化平滑。'
    },
    {
      word: 'coupe-like roofline',
      weight: 0.84,
      x: 53,
      y: 36,
      width: 20,
      height: 10,
      focus: 'A柱至D柱下压式车顶弧线',
      note: '车顶收敛趋势符合轿跑化语义。'
    },
    {
      word: 'smooth surface transitions',
      weight: 0.87,
      x: 51,
      y: 59,
      width: 20,
      height: 14,
      focus: '前后门外板与轮拱邻接区域',
      note: '曲面跳变被有效抑制，光顺连续。'
    },
    {
      word: 'wind-cheating design',
      weight: 0.9,
      x: 34,
      y: 69,
      width: 18,
      height: 12,
      focus: '前保下缘与侧裙导流区域',
      note: '导流相关形面关联度较高。'
    }
  ];
  var PAPER_XAI_MARKERS = [
    {
      id: '1',
      left: 41,
      top: 52,
      level: '中风险',
      title: 'A柱与外后视镜连接区',
      issue: '镜座后方仍有局部分离迹象，可继续收紧过渡半径。',
      advice: '缩短镜座根部外伸长度，并增强A柱外侧导流转折。'
    },
    {
      id: '2',
      left: 63,
      top: 68,
      level: '中风险',
      title: '后轮前缘与侧裙交界',
      issue: '轮包前方气流抬升，附着稳定性有提升空间。',
      advice: '在后轮前缘增加导流特征线，提升侧面气流贴附能力。'
    },
    {
      id: '3',
      left: 84,
      top: 51,
      level: '低风险',
      title: '车尾收敛截面',
      issue: '尾部收敛整体可控，但底缘仍有细化余量。',
      advice: '微调尾部下缘与扩散器过渡，进一步降低尾迹损失。'
    }
  ];
  var DASHBOARD_REPORTS = [
    {
      title: '电动SUV概念设计周报',
      time: '今天 09:30',
      summary: '汇总概念阶段草图探索、比例判断和阶段输出，为下周第一次评审做准备。'
    },
    {
      title: '轿车改款前脸迭代记录',
      time: '昨天 16:20',
      summary: '整理改款方案在灯组位置、格栅尺度和视觉重心上的三轮调整结论。'
    },
    {
      title: 'MPV 新车型内饰趋势简报',
      time: '昨天 10:40',
      summary: '归纳近两周座舱布局、屏幕组合和二排体验方向的竞品观察结果。'
    }
  ];
  var DASHBOARD_SCHEDULE = [
    { time: '今天 10:00', title: '轿车改款方案同步会', owner: '外饰设计组' },
    { time: '明天 15:00', title: 'MPV 新车型内饰方向沟通', owner: '内饰设计组' },
    { time: '2026-03-27 14:00', title: '电动SUV概念设计外饰草图第一次评审', owner: '项目评审会' },
    { time: '2026-03-28 10:30', title: '运动轿跑探索阶段归档', owner: '项目资产库' }
  ];
  var DASHBOARD_TODOS = [
    { title: '完成电动SUV外饰草图第一轮整理', done: true },
    { title: '确认轿车改款前脸对比版面', done: false },
    { title: '补充 MPV 二排体验参考资料', done: false },
    { title: '归档运动轿跑探索阶段版本', done: false }
  ];
  var DASHBOARD_RISKS = [
    { level: '高', text: '电动SUV概念设计仍处于概念阶段早期，评审前需要先收敛一版主姿态。' },
    { level: '中', text: '轿车改款与 MPV 新车型的同步任务较多，本周排期存在挤压风险。' },
    { level: '中', text: '多个项目同时推进，图层命名和版本归档需要保持一致。' }
  ];
  var REPORT_FIXED_DATA = {
    projectName: '电动SUV概念设计',
    projectStage: 'DES · 概念设计阶段',
    reportTime: '2026-03-27 16:20',
    reporter: '外饰设计组（演示）',
    seed: '65981',
    promptCn: '一辆流线型电动SUV，未来主义风格，悬浮式车顶',
    promptEn:
      'streamlined body profile, aerodynamic silhouette, flowing shoulder line, coupe-like roofline, smooth surface transitions, wind-cheating design, automotive design, professional concept art, high detail, photorealistic rendering, studio lighting, 8k quality',
    styleSummary: ['SUV车身 (0.70)', '赛博朋克 (0.50)', '极简主义 (0.62)'],
    iterationHistory: [
      { time: '15:31', action: '创建概念草图 v1，完成基础比例与姿态定位' },
      { time: '15:46', action: '优化提示词并生成三视图候选，筛选主方案' },
      { time: '16:05', action: '运行交叉注意力热力图，完成语义映射核对' },
      { time: '16:18', action: '执行可行性分析，形成改进建议与结论' }
    ],
    styleCompare: [
      { name: '未来主义流线方案', highlights: '车身过渡连贯，轮廓阻力趋势更优', suitability: '主推' },
      { name: '极简科技方案', highlights: '型面干净，量产一致性高', suitability: '备选' },
      { name: '运动强化方案', highlights: '姿态激进，视觉冲击强', suitability: '探索' }
    ]
  };

  var CAR_IMAGES = [
    CASE_VIEW_IMAGES.front,
    CASE_VIEW_IMAGES.side,
    CASE_VIEW_IMAGES.rear,
    CASE_VIEW_IMAGES.front,
    CASE_VIEW_IMAGES.side,
    CASE_VIEW_IMAGES.rear
  ];

  function nowMinusHours(hours) {
    return new Date(Date.now() - hours * 60 * 60 * 1000);
  }

  var state = {
    open: false,
    dashboardOpen: false,
    reportOpen: false,
    profileMenuOpen: false,
    notifyEnabled: true,
    step: 1,
    query: '',
    selectedProjectId: null,
    projects: [
      {
        id: 'project-ev-suv',
        name: '电动SUV概念设计',
        type: 'SUV',
        stage: 'DES',
        progress: 18,
        thumbnail: CAR_IMAGES[0],
        lastUpdated: nowMinusHours(1),
        participantCount: 6
      },
      {
        id: 'project-sedan-refresh',
        name: '轿车改款',
        type: 'SEDAN',
        stage: 'STD',
        progress: 68,
        thumbnail: CAR_IMAGES[1],
        lastUpdated: nowMinusHours(9),
        participantCount: 9
      },
      {
        id: 'project-mpv',
        name: 'MPV新车型',
        type: 'MPV',
        stage: 'PRD',
        progress: 20,
        thumbnail: CAR_IMAGES[2],
        lastUpdated: nowMinusHours(55),
        participantCount: 7
      },
      {
        id: 'project-coupe',
        name: '运动轿跑探索',
        type: 'COUPE',
        stage: 'STMD',
        progress: 83,
        thumbnail: CAR_IMAGES[3],
        lastUpdated: nowMinusHours(3),
        participantCount: 11
      }
    ],
    session: null,
    viewMode: 'GRID',
    selectedImageIds: [],
    anchorImageId: null,
    activeImageId: null,
    compareSplit: 50,
    annotationTool: null,
    annotationColor: '#f59e0b',
    lastAction: '系统初始化',
    lastActionAt: new Date(),
    toastId: 0,
    toasts: [],
    scenarioPromptApplied: false,
    scenarioPromptOptimized: false,
    scenarioOptimizePending: false,
    scenarioActiveView: 'front',
    dashboardTodos: DASHBOARD_TODOS.map(function (todo) {
      return { title: todo.title, done: todo.done };
    })
  };

  function createId(prefix) {
    return prefix + '-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(date) {
    if (!date) {
      return '--';
    }
    return new Date(date).toLocaleString('zh-CN', { hour12: false });
  }

  function addToast(message, type) {
    state.toastId += 1;
    var toast = {
      id: state.toastId,
      message: message,
      type: type || 'info'
    };
    state.toasts.unshift(toast);
    state.toasts = state.toasts.slice(0, 4);
    render();

    window.setTimeout(function () {
      state.toasts = state.toasts.filter(function (item) {
        return item.id !== toast.id;
      });
      render();
    }, 2400);
  }

  function touchAction(text) {
    state.lastAction = text || '已更新';
    state.lastActionAt = new Date();
  }

  function createSession(projectId) {
    return {
      id: createId('review-session'),
      projectId: projectId,
      title: '',
      specialty: 'EXTERIOR',
      images: [],
      status: 'PREPARING',
      createdAt: new Date(),
      completedAt: null
    };
  }

  function getFilteredProjects() {
    var query = state.query.trim().toLowerCase();
    if (!query) {
      return state.projects;
    }

    return state.projects.filter(function (project) {
      return (
        project.name.toLowerCase().indexOf(query) >= 0 ||
        project.id.toLowerCase().indexOf(query) >= 0 ||
        project.type.toLowerCase().indexOf(query) >= 0
      );
    });
  }

  function getActiveImage() {
    if (!state.session || state.session.images.length === 0) {
      return null;
    }

    var active = state.session.images.find(function (image) {
      return image.id === state.activeImageId;
    });

    return active || state.session.images[0];
  }

  function markReviewed(image) {
    image.reviewed = !!(image.rating || image.decision || image.comments || image.annotations.length > 0);
  }

  function updateActiveImage(updater) {
    if (!state.session) {
      return;
    }

    var activeImage = getActiveImage();
    if (!activeImage) {
      return;
    }

    updater(activeImage);
    markReviewed(activeImage);
    render();
  }

  function getMosaicLayout(count) {
    if (count <= 1) {
      return { columns: 1, rows: 1 };
    }
    if (count === 2) {
      return { columns: 2, rows: 1 };
    }
    if (count <= 4) {
      return { columns: 2, rows: 2 };
    }
    return { columns: 3, rows: 2 };
  }

  function selectImage(imageId, event) {
    if (!state.session) {
      return;
    }

    var orderedIds = state.session.images.map(function (item) {
      return item.id;
    });
    var clickedIndex = orderedIds.indexOf(imageId);
    if (clickedIndex < 0) {
      return;
    }

    var isMulti = !!(event && (event.metaKey || event.ctrlKey));
    var isRange = !!(event && event.shiftKey);

    if (isRange && state.anchorImageId) {
      var anchorIndex = orderedIds.indexOf(state.anchorImageId);
      if (anchorIndex >= 0) {
        var start = Math.min(anchorIndex, clickedIndex);
        var end = Math.max(anchorIndex, clickedIndex);
        state.selectedImageIds = orderedIds.slice(start, end + 1);
        state.activeImageId = imageId;
        render();
        return;
      }
    }

    if (isMulti) {
      var exists = state.selectedImageIds.indexOf(imageId) >= 0;
      if (exists) {
        state.selectedImageIds = state.selectedImageIds.filter(function (id) {
          return id !== imageId;
        });
      } else {
        state.selectedImageIds = state.selectedImageIds.concat([imageId]);
      }
      if (state.selectedImageIds.length === 0) {
        state.selectedImageIds = [imageId];
      }
      state.anchorImageId = imageId;
      state.activeImageId = imageId;
      render();
      return;
    }

    state.selectedImageIds = [imageId];
    state.anchorImageId = imageId;
    state.activeImageId = imageId;
    render();
  }

  function goPrevImage() {
    if (!state.session || state.session.images.length === 0) {
      return;
    }
    var ids = state.session.images.map(function (item) {
      return item.id;
    });
    var index = ids.indexOf(state.activeImageId);
    if (index < 0) {
      index = 0;
    }
    var target = ids[Math.max(0, index - 1)];
    state.activeImageId = target;
    state.selectedImageIds = [target];
    state.anchorImageId = target;
    render();
  }

  function goNextImage() {
    if (!state.session || state.session.images.length === 0) {
      return;
    }
    var ids = state.session.images.map(function (item) {
      return item.id;
    });
    var index = ids.indexOf(state.activeImageId);
    if (index < 0) {
      index = 0;
    }
    var target = ids[Math.min(ids.length - 1, index + 1)];
    state.activeImageId = target;
    state.selectedImageIds = [target];
    state.anchorImageId = target;
    render();
  }

  function handleHotkey(event) {
    if (!state.open || state.step !== 3) {
      return;
    }

    var target = event.target;
    var tagName = target && target.tagName ? target.tagName.toLowerCase() : '';
    if (tagName === 'input' || tagName === 'textarea') {
      return;
    }

    if (event.key >= '1' && event.key <= '5') {
      updateActiveImage(function (image) {
        image.rating = Number(event.key);
      });
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrevImage();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNextImage();
    }
  }

  function renderStepper() {
    var steps = [
      { value: 1, label: '项目选择' },
      { value: 2, label: '评审准备' },
      { value: 3, label: '评审会议' },
      { value: 4, label: '评审纪要' }
    ];

    return (
      '<ol class="gc-steps">' +
      steps
        .map(function (step) {
          return (
            '<li class="' +
            (state.step >= step.value ? 'done' : '') +
            '">' +
            '<span>' +
            step.value +
            '</span>' +
            '<strong>' +
            step.label +
            '</strong>' +
            '</li>'
          );
        })
        .join('') +
      '</ol>'
    );
  }

  function renderProjectSelection() {
    var projects = getFilteredProjects();

    return (
      '<section class="gc-section">' +
      '<div class="gc-header-row">' +
      '<h2>Step 1 · 项目选择</h2>' +
      '<p>搜索项目，点击卡片后创建新的评审会议。</p>' +
      '</div>' +
      '<div class="gc-toolbar">' +
      '<input data-bind="query" type="search" placeholder="搜索项目名称 / 编号..." value="' +
      escapeHtml(state.query) +
      '" />' +
      '<button class="gc-btn gc-btn-primary" data-action="create-session">新建评审</button>' +
      '</div>' +
      '<div class="gc-project-grid">' +
      projects
        .map(function (project) {
          var stageIndex = STAGE_ORDER.indexOf(project.stage);
          return (
            '<article class="gc-project-card ' +
            (state.selectedProjectId === project.id ? 'selected' : '') +
            '" data-action="select-project" data-project-id="' +
            project.id +
            '">' +
            '<img src="' +
            escapeHtml(project.thumbnail) +
            '" alt="' +
            escapeHtml(project.name) +
            '" />' +
            '<div class="gc-project-body">' +
            '<h3>' +
            escapeHtml(project.name) +
            '</h3>' +
            '<p>' +
            project.type +
            ' · ' +
            project.stage +
            '</p>' +
            '<p>参与人数：' +
            project.participantCount +
            '</p>' +
            '<p>最近更新：' +
            formatDate(project.lastUpdated) +
            '</p>' +
            '<div class="gc-stage-row">' +
            STAGE_ORDER.map(function (stage, index) {
              return '<span class="' + (index <= stageIndex ? 'done' : '') + '">' + stage + '</span>';
            }).join('') +
            '</div>' +
            '<div class="gc-progress"><div style="width:' +
            project.progress +
            '%"></div></div>' +
            '<button class="gc-btn gc-btn-secondary gc-full" data-action="create-session" data-project-id="' +
            project.id +
            '">进入项目</button>' +
            '</div>' +
            '</article>'
          );
        })
        .join('') +
      '</div>' +
      '</section>'
    );
  }

  function renderPreparation() {
    if (!state.session) {
      return '<div class="gc-empty">请先在 Step 1 选择项目。</div>';
    }

    function iconBySpecialty(value) {
      if (value === 'EXTERIOR') {
        return '🚗';
      }
      if (value === 'INTERIOR') {
        return '🛋';
      }
      if (value === 'CMF') {
        return '🎨';
      }
      return '◎';
    }

    return (
      '<section class="gc-section">' +
      '<div class="gc-header-row gc-header-row-prep">' +
      '<h2>Step 2 · 评审准备</h2>' +
      '<p>保持你当前的流程，按下方三步完成本次评审配置。</p>' +
      '</div>' +
      '<article class="gc-panel gc-prep-panel">' +
      '<div class="gc-section-title"><span>1</span><h3>选择评审专业</h3></div>' +
      '<div class="gc-specialty-grid">' +
      SPECIALTY_OPTIONS.map(function (option) {
        return (
          '<label class="gc-specialty-card ' +
          (state.session.specialty === option.value ? 'selected' : '') +
          '">' +
          '<input data-bind="specialty" type="radio" name="gc-specialty" value="' +
          option.value +
          '" ' +
          (state.session.specialty === option.value ? 'checked' : '') +
          ' />' +
          '<span class="gc-specialty-icon">' +
          iconBySpecialty(option.value) +
          '</span>' +
          '<span class="gc-specialty-label">' +
          option.label +
          '</span>' +
          '</label>'
        );
      }).join('') +
      '</div>' +
      '<div class="gc-section-title"><span>2</span><h3>评审主题</h3></div>' +
      '<input class="gc-theme-input" data-bind="title" type="text" placeholder="例如：轿车改款方案 - 设计评审" value="' +
      escapeHtml(state.session.title || '') +
      '" />' +
      '<div class="gc-section-title"><span>3</span><h3>上传评审图片</h3></div>' +
      '<div class="gc-dropzone" id="gc-dropzone" data-action="open-uploader">' +
      '<div class="gc-upload-icon">⇪</div>' +
      '<p class="gc-upload-main">点击或拖拽上传图片</p>' +
      '<p class="gc-upload-sub">支持 JPG、PNG、WebP 格式，最多上传 20 张图片</p>' +
      '<button class="gc-btn gc-btn-secondary" data-action="open-uploader">选择图片</button>' +
      '</div>' +
      '<div class="gc-upload-grid">' +
      state.session.images
        .map(function (image) {
          return (
            '<article class="gc-upload-item">' +
            '<img src="' +
            escapeHtml(image.thumbnail) +
            '" alt="' +
            escapeHtml(image.name) +
            '" />' +
            '<p>' +
            escapeHtml(image.name) +
            '</p>' +
            '<button class="gc-btn gc-btn-danger gc-tiny" data-action="remove-upload" data-image-id="' +
            image.id +
            '">删除</button>' +
            '</article>'
          );
        })
        .join('') +
      '</div>' +
      '</article>' +
      '<div class="gc-footer">' +
      '<button class="gc-btn gc-btn-secondary" data-action="set-step" data-step="1">返回项目选择</button>' +
      '<button class="gc-btn gc-btn-primary" data-action="start-review">提交评审并进入会议</button>' +
      '</div>' +
      '</section>'
    );
  }

  function renderGridView() {
    if (!state.session) {
      return '<div class="gc-empty">无图像</div>';
    }

    return (
      '<div class="gc-grid-view">' +
      state.session.images
        .map(function (image, index) {
          var selected = state.selectedImageIds.indexOf(image.id) >= 0;
          return (
            '<button class="gc-grid-cell ' +
            (selected ? 'selected' : '') +
            ' ' +
            (image.reviewed ? 'reviewed' : 'pending') +
            '" data-action="select-image" data-image-id="' +
            image.id +
            '">' +
            '<img src="' +
            escapeHtml(image.url) +
            '" alt="' +
            escapeHtml(image.name) +
            '" />' +
            '<span>图 ' +
            (index + 1) +
            '</span>' +
            '</button>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function renderSingleView() {
    var active = getActiveImage();
    if (!active) {
      return '<div class="gc-empty">请选择图片</div>';
    }

    return (
      '<div class="gc-single-view">' +
      '<div class="gc-canvas" data-action="canvas-click">' +
      '<img src="' +
      escapeHtml(active.url) +
      '" alt="' +
      escapeHtml(active.name) +
      '" />' +
      '<div class="gc-annotation-layer">' +
      active.annotations
        .map(function (annotation) {
          var style = 'left:' + annotation.x * 100 + '%;top:' + annotation.y * 100 + '%;color:' + annotation.color + ';border-color:' + annotation.color + ';';
          if (annotation.type === 'text') {
            return '<div class="gc-anno-text" style="' + style + '">' + escapeHtml(annotation.content || '文字') + '</div>';
          }
          if (annotation.type === 'arrow') {
            return '<div class="gc-anno-arrow" style="' + style + '">↗</div>';
          }
          return '<div class="gc-anno-circle" style="' + style + '"></div>';
        })
        .join('') +
      '</div>' +
      '</div>' +
      '</div>'
    );
  }

  function renderCompareView() {
    if (!state.session) {
      return '<div class="gc-empty">无图像</div>';
    }

    var selected = state.session.images.filter(function (image) {
      return state.selectedImageIds.indexOf(image.id) >= 0;
    });

    if (selected.length < 2) {
      selected = state.session.images.slice(0, 2);
    }

    if (selected.length < 2) {
      return '<div class="gc-empty">至少需要两张图像进行对比。</div>';
    }

    return (
      '<div class="gc-compare-view">' +
      '<div class="gc-compare-canvas">' +
      '<div style="flex-basis:' +
      state.compareSplit +
      '%"><img src="' +
      escapeHtml(selected[0].url) +
      '" alt="' +
      escapeHtml(selected[0].name) +
      '" /></div>' +
      '<div style="flex-basis:' +
      (100 - state.compareSplit) +
      '%"><img src="' +
      escapeHtml(selected[1].url) +
      '" alt="' +
      escapeHtml(selected[1].name) +
      '" /></div>' +
      '</div>' +
      '<input data-bind="compare-split" type="range" min="10" max="90" value="' +
      state.compareSplit +
      '" />' +
      '</div>'
    );
  }

  function renderMosaicView() {
    if (!state.session) {
      return '<div class="gc-empty">无图像</div>';
    }

    var selected = state.session.images.filter(function (image) {
      return state.selectedImageIds.indexOf(image.id) >= 0;
    });

    if (selected.length < 2) {
      selected = state.session.images.slice(0, 6);
    } else {
      selected = selected.slice(0, 6);
    }

    var layout = getMosaicLayout(selected.length || 1);

    return (
      '<div class="gc-mosaic" style="grid-template-columns:repeat(' +
      layout.columns +
      ',minmax(0,1fr));grid-template-rows:repeat(' +
      layout.rows +
      ',minmax(0,1fr));">' +
      selected
        .map(function (image) {
          return (
            '<button class="gc-mosaic-cell ' +
            (state.selectedImageIds.indexOf(image.id) >= 0 ? 'selected' : '') +
            '" data-action="select-image" data-image-id="' +
            image.id +
            '">' +
            '<img src="' +
            escapeHtml(image.url) +
            '" alt="' +
            escapeHtml(image.name) +
            '" />' +
            '</button>'
          );
        })
        .join('') +
      '</div>'
    );
  }

  function renderMeetingCenter() {
    if (state.viewMode === 'SINGLE') {
      return renderSingleView();
    }
    if (state.viewMode === 'COMPARE') {
      return renderCompareView();
    }
    if (state.viewMode === 'MOSAIC') {
      return renderMosaicView();
    }
    return renderGridView();
  }

  function renderMeeting() {
    if (!state.session || state.session.images.length === 0) {
      return '<div class="gc-empty">请先上传图片后进入会议。</div>';
    }

    var active = getActiveImage();

    return (
      '<section class="gc-section">' +
      '<div class="gc-header-row">' +
      '<h2>Step 3 · 评审会议</h2>' +
      '<p>支持 Ctrl/Cmd + 点击多选、Shift + 点击范围选择、数字键 1-5 快速评分。</p>' +
      '</div>' +
      '<div class="gc-view-modes">' +
      VIEW_MODES.map(function (mode) {
        return (
          '<button class="gc-btn gc-chip ' +
          (state.viewMode === mode.value ? 'active' : '') +
          '" data-action="set-view-mode" data-view-mode="' +
          mode.value +
          '">' +
          mode.label +
          '</button>'
        );
      }).join('') +
      '</div>' +
      '<div class="gc-meeting-layout">' +
      '<aside class="gc-meeting-left gc-panel">' +
      '<h3>图片缩略图</h3>' +
      '<div class="gc-thumb-list">' +
      state.session.images
        .map(function (image, index) {
          var selected = state.selectedImageIds.indexOf(image.id) >= 0;
          return (
            '<article class="gc-thumb-item ' +
            (selected ? 'selected' : '') +
            ' ' +
            (image.reviewed ? 'reviewed' : 'pending') +
            '" data-action="select-image" data-image-id="' +
            image.id +
            '">' +
            '<img src="' +
            escapeHtml(image.thumbnail) +
            '" alt="' +
            escapeHtml(image.name) +
            '" />' +
            '<div><strong>图 ' +
            (index + 1) +
            '</strong><p>' +
            escapeHtml(image.name) +
            '</p></div>' +
            '</article>'
          );
        })
        .join('') +
      '</div>' +
      '</aside>' +
      '<main class="gc-meeting-center gc-panel">' +
      renderMeetingCenter() +
      '</main>' +
      '<aside class="gc-meeting-right gc-panel">' +
      '<h3>评审工具栏</h3>' +
      '<div class="gc-tool-block">' +
      '<span>批注工具</span>' +
      '<div class="gc-tool-row">' +
      '<button class="gc-btn gc-chip ' +
      (state.annotationTool === 'circle' ? 'active' : '') +
      '" data-action="set-tool" data-tool="circle">画笔标注</button>' +
      '<button class="gc-btn gc-chip ' +
      (state.annotationTool === 'arrow' ? 'active' : '') +
      '" data-action="set-tool" data-tool="arrow">箭头标注</button>' +
      '<button class="gc-btn gc-chip ' +
      (state.annotationTool === 'text' ? 'active' : '') +
      '" data-action="set-tool" data-tool="text">文字批注</button>' +
      '</div>' +
      '<input data-bind="annotation-color" type="color" value="' +
      escapeHtml(state.annotationColor) +
      '" />' +
      '</div>' +
      '<div class="gc-tool-block">' +
      '<span>评分（快捷键 1-5）</span>' +
      '<div class="gc-stars">' +
      [1, 2, 3, 4, 5]
        .map(function (score) {
          var activeClass = active && active.rating && score <= active.rating ? 'active' : '';
          return '<button class="gc-star ' + activeClass + '" data-action="set-rating" data-rating="' + score + '" title="评分 ' + score + '">★</button>';
        })
        .join('') +
      '</div>' +
      '</div>' +
      '<div class="gc-tool-block">' +
      '<span>评审决策</span>' +
      '<div class="gc-tool-row">' +
      DECISION_OPTIONS.map(function (option) {
        var selected = active && active.decision === option.value;
        return (
          '<button class="gc-btn gc-chip ' +
          (selected ? 'active' : '') +
          '" data-action="set-decision" data-decision="' +
          option.value +
          '">' +
          option.label +
          '</button>'
        );
      }).join('') +
      '</div>' +
      '</div>' +
      '<div class="gc-tool-block">' +
      '<span>建议</span>' +
      '<textarea data-bind="active-comment" rows="4" placeholder="填写该图建议...">' +
      escapeHtml((active && active.comments) || '') +
      '</textarea>' +
      '</div>' +
      '<div class="gc-tool-row">' +
      '<button class="gc-btn gc-btn-secondary" data-action="prev-image">上一张</button>' +
      '<button class="gc-btn gc-btn-secondary" data-action="next-image">下一张</button>' +
      '</div>' +
      '<button class="gc-btn gc-btn-primary gc-full" data-action="open-minutes">进入评审纪要</button>' +
      '</aside>' +
      '</div>' +
      '</section>'
    );
  }

  function renderMinutes() {
    if (!state.session) {
      return '<div class="gc-empty">暂无评审纪要。</div>';
    }

    var ratingImages = state.session.images.filter(function (image) {
      return !!image.rating;
    });
    var avg = 0;
    if (ratingImages.length > 0) {
      avg = ratingImages.reduce(function (sum, image) {
        return sum + image.rating;
      }, 0);
      avg = (avg / ratingImages.length).toFixed(2);
    }

    var passCount = state.session.images.filter(function (image) {
      return image.decision === 'PASS';
    }).length;
    var reviseCount = state.session.images.filter(function (image) {
      return image.decision === 'REVISE';
    }).length;
    var rejectCount = state.session.images.filter(function (image) {
      return image.decision === 'REJECT';
    }).length;

    return (
      '<section class="gc-section">' +
      '<div class="gc-header-row">' +
      '<h2>Step 4 · 评审纪要</h2>' +
      '<p>导出纪要和发送通知为模拟动作，不会触发真实外部服务。</p>' +
      '</div>' +
      '<div class="gc-minutes-top">' +
      '<article class="gc-panel">' +
      '<h3>评审概览</h3>' +
      '<p>主题：' +
      escapeHtml(state.session.title || '未命名评审') +
      '</p>' +
      '<p>时间：' +
      formatDate(state.session.createdAt) +
      '</p>' +
      '<p>参与人：' +
      escapeHtml(PARTICIPANTS.join('、')) +
      '</p>' +
      '<p>专业：' +
      escapeHtml(SPECIALTY_OPTIONS.find(function (option) {
        return option.value === state.session.specialty;
      }).label) +
      '</p>' +
      '<p>状态：' +
      (state.session.status === 'COMPLETED' ? '已完成' : '进行中') +
      '</p>' +
      '</article>' +
      '<article class="gc-panel">' +
      '<h3>评分统计</h3>' +
      '<p>平均评分：' +
      (avg || '--') +
      '</p>' +
      '<p>通过：' +
      passCount +
      ' · 修改：' +
      reviseCount +
      ' · 否决：' +
      rejectCount +
      '</p>' +
      '<p>完成时间：' +
      formatDate(state.session.completedAt) +
      '</p>' +
      '</article>' +
      '</div>' +
      '<article class="gc-panel gc-table-panel">' +
      '<h3>图片评分表</h3>' +
      '<div class="gc-table-wrap">' +
      '<table>' +
      '<thead><tr><th>图片</th><th>评分</th><th>决策</th><th>建议</th></tr></thead>' +
      '<tbody>' +
      state.session.images
        .map(function (image) {
          var decisionLabel = DECISION_OPTIONS.find(function (option) {
            return option.value === image.decision;
          });
          return (
            '<tr>' +
            '<td><div class="gc-image-cell"><img src="' +
            escapeHtml(image.thumbnail) +
            '" alt="' +
            escapeHtml(image.name) +
            '" /><span>' +
            escapeHtml(image.name) +
            '</span></div></td>' +
            '<td>' +
            (image.rating ? '★'.repeat(image.rating) + '☆'.repeat(5 - image.rating) : '--') +
            '</td>' +
            '<td>' +
            (decisionLabel ? decisionLabel.label : '--') +
            '</td>' +
            '<td>' +
            escapeHtml(image.comments || '--') +
            '</td>' +
            '</tr>'
          );
        })
        .join('') +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</article>' +
      '<div class="gc-footer">' +
      '<button class="gc-btn gc-btn-secondary" data-action="mock-export">导出纪要</button>' +
      '<button class="gc-btn gc-btn-secondary" data-action="mock-notify">发送通知</button>' +
      '<button class="gc-btn gc-btn-secondary" data-action="set-step" data-step="3">返回会议</button>' +
      '<button class="gc-btn gc-btn-primary" data-action="complete-session">完成评审</button>' +
      '<button class="gc-btn gc-btn-ghost" data-action="restart">新建下一场评审</button>' +
      '</div>' +
      '</section>'
    );
  }

  function renderBody() {
    if (state.step === 1) {
      return renderProjectSelection();
    }
    if (state.step === 2) {
      return renderPreparation();
    }
    if (state.step === 3) {
      return renderMeeting();
    }
    return renderMinutes();
  }

  function renderToasts() {
    return (
      '<div class="gc-toast-wrap">' +
      state.toasts
        .map(function (toast) {
          return '<div class="gc-toast ' + toast.type + '"><span>' + escapeHtml(toast.message) + '</span></div>';
        })
        .join('') +
      '</div>'
    );
  }

  function getRuntimeStats() {
    var reviewedCount = 0;
    var imageCount = 0;
    var sessionStatus = '未开始';
    var sessionTitle = '暂无评审会';
    if (state.session) {
      imageCount = state.session.images.length;
      reviewedCount = state.session.images.filter(function (item) {
        return !!item.reviewed;
      }).length;
      sessionStatus = state.session.status;
      sessionTitle = state.session.title || '未命名评审会议';
    }

    var progressAvg = 0;
    if (state.projects.length > 0) {
      progressAvg = Math.round(
        state.projects.reduce(function (sum, item) {
          return sum + item.progress;
        }, 0) / state.projects.length
      );
    }

    return {
      imageCount: imageCount,
      reviewedCount: reviewedCount,
      sessionStatus: sessionStatus,
      sessionTitle: sessionTitle,
      progressAvg: progressAvg
    };
  }

  function renderKnowledgeGraph() {
    var nodes = [
      { id: 'strategy', x: 52, y: 22, label: '策略' },
      { id: 'exterior', x: 24, y: 48, label: '外饰' },
      { id: 'interior', x: 50, y: 68, label: '内饰' },
      { id: 'cmf', x: 76, y: 48, label: 'CMF' },
      { id: 'review', x: 52, y: 44, label: '评审' }
    ];
    var links = [
      ['strategy', 'review'],
      ['review', 'exterior'],
      ['review', 'interior'],
      ['review', 'cmf'],
      ['strategy', 'cmf']
    ];
    var nodeMap = {};
    nodes.forEach(function (node) {
      nodeMap[node.id] = node;
    });

    return (
      '<svg viewBox="0 0 100 80" class="gc-graph-svg" role="img" aria-label="知识图谱">' +
      links
        .map(function (pair) {
          var from = nodeMap[pair[0]];
          var to = nodeMap[pair[1]];
          return (
            '<line x1="' +
            from.x +
            '" y1="' +
            from.y +
            '" x2="' +
            to.x +
            '" y2="' +
            to.y +
            '" />'
          );
        })
        .join('') +
      nodes
        .map(function (node) {
          return (
            '<g class="gc-graph-node">' +
            '<circle cx="' +
            node.x +
            '" cy="' +
            node.y +
            '" r="6"></circle>' +
            '<text x="' +
            node.x +
            '" y="' +
            (node.y + 14) +
            '">' +
            escapeHtml(node.label) +
            '</text>' +
            '</g>'
          );
        })
        .join('') +
      '</svg>'
    );
  }

  function renderDashboard() {
    var stats = getRuntimeStats();
    return (
      '<section class="gc-dashboard">' +
      '<header class="gc-dashboard-top">' +
      '<div>' +
      '<h1>个人项目看板</h1>' +
      '<p>汇总设计师当前在管项目的进度、报告、日程与阶段风险，电动SUV概念设计为当前重点任务。</p>' +
      '</div>' +
      '<div class="gc-dashboard-top-actions">' +
      '<button class="gc-btn gc-btn-secondary" data-action="dashboard-refresh">刷新看板</button>' +
      '<button class="gc-btn gc-btn-secondary" data-action="dashboard-open-admin">后台设置</button>' +
      '<button class="gc-btn gc-btn-primary" data-action="dashboard-open-review">进入评审中心</button>' +
      '<button class="gc-btn gc-btn-ghost" data-action="dashboard-go-workbench">进入工作台</button>' +
      '</div>' +
      '</header>' +
      '<div class="gc-bento-grid">' +
      '<article class="gc-bento-card span-6">' +
      '<h3>项目进度</h3>' +
      '<p class="gc-kpi">平均进度 <strong>' +
      stats.progressAvg +
      '%</strong></p>' +
      '<div class="gc-progress-list">' +
      state.projects
        .map(function (project) {
          return (
            '<div class="gc-progress-row">' +
            '<div class="gc-progress-meta"><span>' +
            escapeHtml(project.name) +
            '</span><em>' +
            project.progress +
            '%</em></div>' +
            '<div class="gc-progress"><div style="width:' +
            project.progress +
            '%"></div></div>' +
            '</div>'
          );
        })
        .join('') +
      '</div>' +
      '</article>' +
      '<article class="gc-bento-card span-3">' +
      '<h3>最新报告</h3>' +
      '<ul class="gc-mini-list">' +
      DASHBOARD_REPORTS.map(function (report) {
        return (
          '<li><strong>' +
          escapeHtml(report.title) +
          '</strong><span>' +
          escapeHtml(report.time) +
          '</span><p>' +
          escapeHtml(report.summary) +
          '</p></li>'
        );
      }).join('') +
      '</ul>' +
      '</article>' +
      '<article class="gc-bento-card span-3">' +
      '<h3>知识图谱</h3>' +
      renderKnowledgeGraph() +
      '</article>' +
      '<article class="gc-bento-card span-4">' +
      '<h3>个人日程</h3>' +
      '<ul class="gc-schedule-list">' +
      DASHBOARD_SCHEDULE.map(function (item) {
        return (
          '<li><time>' +
          escapeHtml(item.time) +
          '</time><div><strong>' +
          escapeHtml(item.title) +
          '</strong><span>' +
          escapeHtml(item.owner) +
          '</span></div></li>'
        );
      }).join('') +
      '</ul>' +
      '</article>' +
      '<article class="gc-bento-card span-4">' +
      '<h3>设计进程</h3>' +
      '<p class="gc-kpi"><strong>' +
      stats.reviewedCount +
      '/' +
      stats.imageCount +
      '</strong> 已整理图片</p>' +
      '<p>当前聚焦：电动SUV概念设计</p>' +
      '<p>状态：' +
      escapeHtml(stats.sessionStatus) +
      '</p>' +
      '<p>最近动作：' +
      escapeHtml(state.lastAction) +
      ' · ' +
      formatDate(state.lastActionAt) +
      '</p>' +
      '</article>' +
      '<article class="gc-bento-card span-4">' +
      '<h3>工作台状态</h3>' +
      '<p class="gc-kpi"><strong>' +
      state.projects.length +
      '</strong> 个在管项目</p>' +
      '<p>当前重点：电动SUV外饰草图探索与比例验证</p>' +
      '<p>设计师同时维护轿车改款、MPV 新车型与运动轿跑探索项目</p>' +
      '<p>支持纯净模式、参数记录与版本回溯</p>' +
      '</article>' +
      '<article class="gc-bento-card span-4">' +
      '<h3>风险提醒</h3>' +
      '<ul class="gc-tag-list">' +
      DASHBOARD_RISKS.map(function (risk) {
        return (
          '<li><span class="level">' +
          escapeHtml(risk.level) +
          '</span><p>' +
          escapeHtml(risk.text) +
          '</p></li>'
        );
      }).join('') +
      '</ul>' +
      '</article>' +
      '<article class="gc-bento-card span-4">' +
      '<h3>待办清单</h3>' +
      '<ul class="gc-todo-list">' +
      state.dashboardTodos
        .map(function (todo, index) {
          return (
            '<li class="' +
            (todo.done ? 'done' : '') +
            '">' +
            '<button data-action="dashboard-toggle-todo" data-todo-index="' +
            index +
            '">' +
            (todo.done ? '☑' : '☐') +
            '</button><span>' +
            escapeHtml(todo.title) +
            '</span></li>'
          );
        })
        .join('') +
      '</ul>' +
      '</article>' +
      '<article class="gc-bento-card span-4">' +
      '<h3>快捷操作</h3>' +
      '<div class="gc-quick-actions">' +
      '<button class="gc-btn gc-btn-secondary" data-action="dashboard-open-review">新建评审</button>' +
      '<button class="gc-btn gc-btn-secondary" data-action="dashboard-open-admin">打开后台</button>' +
      '<button class="gc-btn gc-btn-secondary" data-action="dashboard-go-workbench">返回工作台</button>' +
      '</div>' +
      '</article>' +
      '</div>' +
      '</section>'
    );
  }

  function renderDesignReport() {
    return (
      '<section class="gc-report-page">' +
      '<article class="gc-report-card">' +
      '<h3>项目信息</h3>' +
      '<div class="gc-report-kv">' +
      '<span>项目名称</span><strong>' +
      escapeHtml(REPORT_FIXED_DATA.projectName) +
      '</strong>' +
      '</div>' +
      '<div class="gc-report-kv"><span>阶段</span><strong>' +
      escapeHtml(REPORT_FIXED_DATA.projectStage) +
      '</strong></div>' +
      '<div class="gc-report-kv"><span>报告时间</span><strong>' +
      escapeHtml(REPORT_FIXED_DATA.reportTime) +
      '</strong></div>' +
      '<div class="gc-report-kv"><span>整理人</span><strong>' +
      escapeHtml(REPORT_FIXED_DATA.reporter) +
      '</strong></div>' +
      '</article>' +
      '<article class="gc-report-card">' +
      '<h3>参数元数据（自动记录）</h3>' +
      '<div class="gc-report-kv"><span>Prompt（原始）</span><p>' +
      escapeHtml(REPORT_FIXED_DATA.promptCn) +
      '</p></div>' +
      '<div class="gc-report-kv"><span>Prompt（优化结果）</span><p>' +
      escapeHtml(REPORT_FIXED_DATA.promptEn) +
      '</p></div>' +
      '<div class="gc-report-kv"><span>风格设置</span><p>' +
      escapeHtml(REPORT_FIXED_DATA.styleSummary.join(' / ')) +
      '</p></div>' +
      '<div class="gc-report-kv"><span>随机种子</span><strong>' +
      escapeHtml(REPORT_FIXED_DATA.seed) +
      '</strong></div>' +
      '</article>' +
      '<article class="gc-report-card">' +
      '<h3>设计迭代历史</h3>' +
      '<ul class="gc-report-list">' +
      REPORT_FIXED_DATA.iterationHistory
        .map(function (item) {
          return '<li><time>' + escapeHtml(item.time) + '</time><span>' + escapeHtml(item.action) + '</span></li>';
        })
        .join('') +
      '</ul>' +
      '</article>' +
      '<article class="gc-report-card">' +
      '<h3>三视图渲染结果</h3>' +
      '<div class="gc-report-views">' +
      '<figure><img src="' +
      escapeHtml(CASE_VIEW_IMAGES.front) +
      '" alt="前视图" /><figcaption>前视图</figcaption></figure>' +
      '<figure><img src="' +
      escapeHtml(CASE_VIEW_IMAGES.side) +
      '" alt="侧视图" /><figcaption>侧视图</figcaption></figure>' +
      '<figure><img src="' +
      escapeHtml(CASE_VIEW_IMAGES.rear) +
      '" alt="后视图" /><figcaption>后视图</figcaption></figure>' +
      '</div>' +
      '</article>' +
      '<article class="gc-report-card">' +
      '<h3>风格对比分析</h3>' +
      '<div class="gc-report-compare">' +
      REPORT_FIXED_DATA.styleCompare
        .map(function (item) {
          return (
            '<div class="gc-report-compare-item">' +
            '<strong>' +
            escapeHtml(item.name) +
            '</strong>' +
            '<p>' +
            escapeHtml(item.highlights) +
            '</p>' +
            '<em>' +
            escapeHtml(item.suitability) +
            '</em>' +
            '</div>'
          );
        })
        .join('') +
      '</div>' +
      '</article>' +
      '<article class="gc-report-card">' +
      '<h3>热力图分析页面</h3>' +
      '<div class="gc-report-heatmap">' +
      '<img src="./assets/heatmap-manual.jpg" alt="热力图分析" />' +
      '<p>该页用于展示提示词与图像关注区域的映射关系，作为设计方案可控性与可行性说明的辅助证据。</p>' +
      '</div>' +
      '</article>' +
      '</section>'
    );
  }

  var host = document.createElement('div');
  host.id = 'gc-review-addon-host';
  document.body.appendChild(host);
  var shadow = host.attachShadow({ mode: 'open' });

  shadow.innerHTML =
    '<style>' +
    ':host{all:initial}' +
    '.gc-launch{position:fixed;top:14px;right:14px;z-index:2147483600;border:1px solid rgba(34,211,238,.5);background:rgba(6,182,212,.18);color:#ecfeff;border-radius:10px;padding:8px 14px;font:600 13px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.3);pointer-events:auto}' +
    '.gc-launch:hover{background:rgba(6,182,212,.28)}' +
    '.gc-overlay{position:fixed;inset:0;background:rgba(2,6,23,.72);backdrop-filter:blur(6px);z-index:2147483599;padding:18px;display:flex;justify-content:center;align-items:center;font:14px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;color:#f8fafc;pointer-events:auto}' +
    '.gc-overlay.hidden{display:none}' +
    '.gc-modal{width:min(1440px,98vw);height:min(920px,95vh);background:#060d18;border:1px solid rgba(148,163,184,.28);border-radius:16px;display:flex;flex-direction:column;overflow:hidden}' +
    '.gc-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(148,163,184,.2);background:rgba(10,15,24,.8)}' +
    '.gc-top h1{margin:0;font-size:20px}' +
    '.gc-top p{margin:6px 0 0;color:#94a3b8;font-size:13px}' +
    '.gc-close{border:1px solid rgba(148,163,184,.35);color:#cbd5e1;background:rgba(15,23,42,.6);border-radius:10px;padding:8px 12px;cursor:pointer}' +
    '.gc-close:hover{background:rgba(30,41,59,.8)}' +
    '.gc-content{padding:14px;overflow:auto;display:flex;flex-direction:column;gap:12px}' +
    '.gc-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0;padding:0;list-style:none}' +
    '.gc-steps li{display:flex;align-items:center;gap:8px;border:1px solid rgba(148,163,184,.28);border-radius:10px;padding:8px;background:rgba(15,23,42,.72)}' +
    '.gc-steps li span{width:23px;height:23px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px;border:1px solid rgba(148,163,184,.35);font-size:12px}' +
    '.gc-steps li.done{border-color:rgba(34,197,94,.55)}' +
    '.gc-steps li.done span{border-color:rgba(34,197,94,.75);background:rgba(34,197,94,.2)}' +
    '.gc-section{display:flex;flex-direction:column;gap:12px}' +
    '.gc-header-row h2{margin:0;font-size:18px}' +
    '.gc-header-row p{margin:6px 0 0;color:#94a3b8;font-size:13px}' +
    '.gc-toolbar{display:flex;gap:8px}' +
    '.gc-toolbar input,.gc-panel input,.gc-panel textarea{width:100%;border:1px solid rgba(148,163,184,.35);border-radius:10px;background:rgba(15,23,42,.7);color:#f8fafc;padding:10px 12px;font:inherit;box-sizing:border-box;outline:none}' +
    '.gc-panel input:focus,.gc-panel textarea:focus,.gc-toolbar input:focus{border-color:rgba(34,211,238,.75);box-shadow:0 0 0 2px rgba(34,211,238,.16)}' +
    '.gc-btn{font:inherit;border-radius:10px;padding:8px 12px;cursor:pointer;transition:.2s ease}' +
    '.gc-btn-primary{border:1px solid rgba(59,130,246,.6);background:linear-gradient(135deg,#06b6d4,#3b82f6);color:#fff}' +
    '.gc-btn-primary:hover{filter:brightness(1.06)}' +
    '.gc-btn-secondary{border:1px solid rgba(148,163,184,.35);background:rgba(15,23,42,.65);color:#e2e8f0}' +
    '.gc-btn-secondary:hover{background:rgba(30,41,59,.9)}' +
    '.gc-btn-danger{border:1px solid rgba(248,113,113,.5);background:rgba(127,29,29,.5);color:#fecaca}' +
    '.gc-btn-ghost{border:1px dashed rgba(148,163,184,.45);background:transparent;color:#cbd5e1}' +
    '.gc-chip{padding:7px 10px}' +
    '.gc-chip.active{border-color:rgba(34,211,238,.8);background:rgba(34,211,238,.16);color:#cffafe}' +
    '.gc-full{width:100%}' +
    '.gc-tiny{padding:5px 8px;font-size:12px}' +
    '.gc-project-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}' +
    '.gc-project-card{border:1px solid rgba(148,163,184,.28);border-radius:12px;background:rgba(15,23,42,.72);overflow:hidden}' +
    '.gc-project-card.selected{border-color:rgba(34,211,238,.7);box-shadow:0 0 0 1px rgba(34,211,238,.35) inset}' +
    '.gc-project-card img{width:100%;height:140px;object-fit:cover;display:block}' +
    '.gc-project-body{padding:10px;display:flex;flex-direction:column;gap:6px}' +
    '.gc-project-body h3{margin:0;font-size:16px}' +
    '.gc-project-body p{margin:0;color:#cbd5e1;font-size:13px}' +
    '.gc-stage-row{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}' +
    '.gc-stage-row span{font-size:11px;text-align:center;border-radius:999px;border:1px solid rgba(148,163,184,.35);padding:2px 0;color:#93c5fd}' +
    '.gc-stage-row span.done{border-color:rgba(34,197,94,.7);background:rgba(34,197,94,.2);color:#dcfce7}' +
    '.gc-progress{height:7px;border-radius:999px;background:rgba(148,163,184,.25);overflow:hidden}' +
    '.gc-progress>div{height:100%;background:linear-gradient(90deg,#22d3ee,#60a5fa)}' +
    '.gc-panel{border:1px solid rgba(148,163,184,.28);border-radius:12px;background:rgba(15,23,42,.66);padding:12px;min-height:0;box-sizing:border-box}' +
    '.gc-panel h3{margin:0 0 10px;font-size:16px}' +
    '.gc-prep-panel{padding:16px;display:flex;flex-direction:column;gap:12px;background:linear-gradient(180deg,rgba(1,8,28,.95) 0%,rgba(2,12,35,.95) 100%);border-color:rgba(59,130,246,.24)}' +
    '.gc-header-row-prep p{max-width:720px}' +
    '.gc-section-title{display:flex;align-items:center;gap:10px}' +
    '.gc-section-title span{width:32px;height:32px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;background:rgba(37,99,235,.95);font-size:18px;font-weight:700}' +
    '.gc-section-title h3{margin:0;font-size:22px;font-weight:700;letter-spacing:.2px}' +
    '.gc-specialty-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}' +
    '.gc-specialty-card{display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;gap:8px;min-height:112px;padding:14px 16px;border-radius:18px;border:1px solid rgba(100,116,139,.45);background:rgba(1,7,30,.85);cursor:pointer;transition:.2s ease;position:relative}' +
    '.gc-specialty-card:hover{border-color:rgba(96,165,250,.7);background:rgba(2,13,42,.95)}' +
    '.gc-specialty-card input{position:absolute;opacity:0;pointer-events:none}' +
    '.gc-specialty-card.selected{border-color:rgba(96,165,250,.88);box-shadow:0 0 0 1px rgba(96,165,250,.45) inset;background:rgba(6,20,52,.95)}' +
    '.gc-specialty-icon{font-size:22px;line-height:1;filter:saturate(.2) brightness(1.3)}' +
    '.gc-specialty-label{font-size:18px;font-weight:700;line-height:1.1;letter-spacing:.2px}' +
    '.gc-theme-input{height:56px;border-radius:16px!important;border:1px solid rgba(100,116,139,.48)!important;background:rgba(30,41,59,.82)!important;font-size:18px!important;font-weight:700!important;padding:0 18px!important}' +
    '.gc-dropzone{border:2px dashed rgba(100,116,139,.55);border-radius:20px;padding:34px 20px;text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center;background:rgba(1,8,30,.72)}' +
    '.gc-dropzone:hover{border-color:rgba(96,165,250,.8);background:rgba(2,15,44,.9)}' +
    '.gc-dropzone.dragover{border-color:rgba(96,165,250,.95);background:rgba(8,25,67,.92)}' +
    '.gc-upload-icon{font-size:52px;line-height:1;color:rgba(148,163,184,.95)}' +
    '.gc-upload-main{margin:0;font-size:18px;font-weight:700;color:#f8fafc}' +
    '.gc-upload-sub{margin:0;color:#94a3b8;font-size:14px}' +
    '.gc-upload-grid{margin-top:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}' +
    '.gc-upload-item{border:1px solid rgba(148,163,184,.28);border-radius:10px;padding:6px;background:rgba(2,6,23,.45);display:flex;flex-direction:column;gap:6px}' +
    '.gc-upload-item img{width:100%;height:76px;border-radius:8px;object-fit:cover;display:block}' +
    '.gc-upload-item p{margin:0;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.gc-footer{display:flex;flex-wrap:wrap;gap:8px}' +
    '.gc-view-modes{display:flex;flex-wrap:wrap;gap:8px}' +
    '.gc-meeting-layout{display:grid;grid-template-columns:220px 1fr 300px;gap:10px;min-height:560px}' +
    '.gc-meeting-left,.gc-meeting-right,.gc-meeting-center{min-height:0;display:flex;flex-direction:column}' +
    '.gc-thumb-list{display:flex;flex-direction:column;gap:8px;overflow:auto}' +
    '.gc-thumb-item{display:flex;gap:8px;align-items:center;border:1px solid rgba(148,163,184,.28);border-radius:10px;padding:7px;background:rgba(2,6,23,.42);cursor:pointer}' +
    '.gc-thumb-item.selected{border-color:rgba(34,211,238,.75)}' +
    '.gc-thumb-item.reviewed{box-shadow:inset 0 0 0 1px rgba(34,197,94,.75)}' +
    '.gc-thumb-item img{width:60px;height:44px;border-radius:8px;object-fit:cover;display:block}' +
    '.gc-thumb-item strong{font-size:13px}' +
    '.gc-thumb-item p{margin:4px 0 0;color:#94a3b8;font-size:12px}' +
    '.gc-grid-view{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;overflow:auto;min-height:0}' +
    '.gc-grid-cell{position:relative;overflow:hidden;border-radius:10px;border:2px solid rgba(148,163,184,.35);padding:0;background:rgba(2,6,23,.3)}' +
    '.gc-grid-cell.pending{border-color:rgba(148,163,184,.45)}' +
    '.gc-grid-cell.reviewed{border-color:rgba(34,197,94,.75)}' +
    '.gc-grid-cell.selected{box-shadow:0 0 0 2px rgba(34,211,238,.75) inset}' +
    '.gc-grid-cell img{width:100%;height:160px;object-fit:cover;display:block}' +
    '.gc-grid-cell span{position:absolute;left:6px;bottom:6px;background:rgba(2,6,23,.8);padding:3px 8px;border-radius:999px;font-size:11px}' +
    '.gc-single-view{display:flex;flex-direction:column;gap:8px;height:100%}' +
    '.gc-canvas{position:relative;border:1px solid rgba(148,163,184,.35);border-radius:12px;overflow:hidden;background:rgba(2,6,23,.85);height:100%;min-height:420px;cursor:crosshair}' +
    '.gc-canvas img{width:100%;height:100%;object-fit:contain;display:block}' +
    '.gc-annotation-layer{position:absolute;inset:0;pointer-events:none}' +
    '.gc-anno-circle,.gc-anno-arrow,.gc-anno-text{position:absolute;transform:translate(-50%,-50%)}' +
    '.gc-anno-circle{width:20px;height:20px;border:2px solid;border-radius:999px}' +
    '.gc-anno-arrow{font-size:18px;font-weight:700}' +
    '.gc-anno-text{background:rgba(15,23,42,.92);border:1px solid;border-radius:6px;padding:3px 6px;font-size:12px;max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.gc-compare-view{display:flex;flex-direction:column;gap:8px;height:100%}' +
    '.gc-compare-canvas{display:flex;gap:1px;border:1px solid rgba(148,163,184,.35);border-radius:10px;overflow:hidden;min-height:420px;flex:1}' +
    '.gc-compare-canvas>div{overflow:hidden}' +
    '.gc-compare-canvas img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.gc-mosaic{display:grid;gap:8px;min-height:420px;height:100%}' +
    '.gc-mosaic-cell{overflow:hidden;border-radius:10px;border:2px solid rgba(148,163,184,.35);padding:0;background:rgba(2,6,23,.35)}' +
    '.gc-mosaic-cell.selected{border-color:rgba(34,211,238,.7)}' +
    '.gc-mosaic-cell img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.gc-tool-block{padding-top:10px;margin-top:10px;border-top:1px solid rgba(148,163,184,.25)}' +
    '.gc-tool-block span{display:block;margin-bottom:6px;color:#cbd5e1}' +
    '.gc-tool-row{display:flex;flex-wrap:wrap;gap:6px}' +
    '.gc-stars{display:flex;gap:6px}' +
    '.gc-star{width:30px;height:30px;border-radius:8px;border:1px solid rgba(148,163,184,.35);background:rgba(15,23,42,.7);color:#64748b;cursor:pointer}' +
    '.gc-star.active,.gc-star:hover{border-color:rgba(245,158,11,.8);background:rgba(245,158,11,.2);color:#f59e0b}' +
    '.gc-minutes-top{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.gc-minutes-top p{margin:6px 0 0;color:#d1d5db}' +
    '.gc-table-wrap{overflow:auto}' +
    '.gc-table-wrap table{width:100%;border-collapse:collapse}' +
    '.gc-table-wrap th,.gc-table-wrap td{border-bottom:1px solid rgba(148,163,184,.25);padding:8px;text-align:left;font-size:13px;vertical-align:top}' +
    '.gc-image-cell{display:flex;align-items:center;gap:8px}' +
    '.gc-image-cell img{width:64px;height:44px;border-radius:8px;object-fit:cover}' +
    '.gc-empty{border:1px dashed rgba(148,163,184,.45);border-radius:12px;padding:20px;text-align:center;color:#94a3b8;background:rgba(15,23,42,.55)}' +
    '.gc-toast-wrap{position:fixed;right:14px;bottom:14px;display:flex;flex-direction:column;gap:8px;z-index:2147483601;font:13px/1.3 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;pointer-events:auto}' +
    '.gc-toast{padding:10px 12px;border-radius:10px;background:rgba(2,6,23,.95);border:1px solid rgba(148,163,184,.35);color:#f8fafc;box-shadow:0 10px 24px rgba(0,0,0,.35)}' +
    '.gc-toast.success{border-color:rgba(34,197,94,.72)}' +
    '.gc-toast.error{border-color:rgba(239,68,68,.72)}' +
    '.gc-toast.info{border-color:rgba(34,211,238,.72)}' +
    '@media (max-width:1200px){.gc-project-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.gc-meeting-layout{grid-template-columns:200px 1fr}.gc-meeting-right{grid-column:1 / -1}.gc-specialty-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}' +
    '@media (max-width:900px){.gc-modal{width:99vw;height:97vh}.gc-content{padding:10px}.gc-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.gc-project-grid,.gc-upload-grid,.gc-minutes-top,.gc-specialty-grid{grid-template-columns:1fr}.gc-meeting-layout{grid-template-columns:1fr}.gc-grid-view{grid-template-columns:repeat(2,minmax(0,1fr))}.gc-toolbar{flex-direction:column}.gc-section-title h3{font-size:18px}.gc-upload-main{font-size:16px}.gc-upload-sub{font-size:12px}.gc-launch{top:auto;bottom:14px;right:14px}}' +
    '</style>' +
    '<button class="gc-launch" id="gc-launch-btn">评审中心</button>' +
    '<div class="gc-overlay hidden" id="gc-overlay">' +
    '<div class="gc-modal">' +
    '<div class="gc-top">' +
    '<div><h1>评审中心</h1><p>在 g2 原版功能不变基础上新增，支持跨专业评审全流程。</p></div>' +
    '<button class="gc-close" id="gc-close-btn">关闭</button>' +
    '</div>' +
    '<div class="gc-content" id="gc-content"></div>' +
    '</div>' +
    '</div>' +
    '<input type="file" id="gc-file-input" accept="image/png,image/jpeg,image/jpg,image/webp" multiple hidden />' +
    '<div id="gc-toasts"></div>';

  var launchBtn = shadow.getElementById('gc-launch-btn');
  var closeBtn = shadow.getElementById('gc-close-btn');
  var overlay = shadow.getElementById('gc-overlay');
  var content = shadow.getElementById('gc-content');
  var toasts = shadow.getElementById('gc-toasts');
  var fileInput = shadow.getElementById('gc-file-input');

  var extraStyle = document.createElement('style');
  extraStyle.textContent =
    '.gc-launch{top:auto !important;bottom:14px !important;right:14px !important;z-index:2147483596 !important}' +
    '.gc-dashboard-float{position:fixed;bottom:14px;right:116px;z-index:2147483596;border:1px solid rgba(59,130,246,.55);background:rgba(30,64,175,.25);color:#dbeafe;border-radius:10px;padding:8px 14px;font:600 13px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.3);pointer-events:auto}' +
    '.gc-dashboard-float:hover{background:rgba(30,64,175,.42)}' +
    '.gc-dashboard-overlay{position:fixed;inset:0;z-index:2147483592;background:radial-gradient(circle at 20% -10%, rgba(37,99,235,.25), transparent 45%),radial-gradient(circle at 100% 0%, rgba(14,165,233,.2), transparent 40%),linear-gradient(160deg, rgba(2,6,23,.96), rgba(3,13,39,.96));backdrop-filter:blur(8px);padding:16px;display:flex;justify-content:center;align-items:center;color:#f8fafc;font:14px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;pointer-events:auto}' +
    '.gc-dashboard-overlay.hidden{display:none}' +
    '.gc-dashboard-shell{width:min(1660px,99vw);height:min(960px,96vh);border:1px solid rgba(148,163,184,.28);border-radius:18px;background:rgba(5,10,24,.92);padding:16px;overflow:auto;box-sizing:border-box}' +
    '.gc-dashboard{display:flex;flex-direction:column;gap:14px}' +
    '.gc-dashboard-top{display:flex;justify-content:space-between;gap:14px;align-items:flex-start}' +
    '.gc-dashboard-top h1{margin:0;font-size:24px}' +
    '.gc-dashboard-top p{margin:6px 0 0;color:#94a3b8}' +
    '.gc-dashboard-top-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}' +
    '.gc-bento-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:10px}' +
    '.gc-bento-card{border:1px solid rgba(148,163,184,.22);border-radius:14px;background:rgba(15,23,42,.62);padding:12px;box-sizing:border-box;transition:.2s ease;min-height:150px}' +
    '.gc-bento-card:hover{border-color:rgba(96,165,250,.65);box-shadow:0 0 0 1px rgba(96,165,250,.18) inset,0 8px 20px rgba(0,0,0,.25)}' +
    '.gc-bento-card h3{margin:0 0 8px;font-size:16px}' +
    '.gc-bento-card .gc-kpi{margin:0 0 8px;color:#cbd5e1}' +
    '.gc-bento-card .gc-kpi strong{font-size:20px;color:#f8fafc}' +
    '.gc-bento-card.span-6{grid-column:span 6}' +
    '.gc-bento-card.span-4{grid-column:span 4}' +
    '.gc-bento-card.span-3{grid-column:span 3}' +
    '.gc-progress-list{display:flex;flex-direction:column;gap:8px}' +
    '.gc-progress-row{display:flex;flex-direction:column;gap:4px}' +
    '.gc-progress-meta{display:flex;justify-content:space-between;font-size:12px;color:#cbd5e1}' +
    '.gc-progress-meta em{font-style:normal;color:#7dd3fc}' +
    '.gc-mini-list,.gc-schedule-list,.gc-tag-list,.gc-todo-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}' +
    '.gc-mini-list li strong{display:block;font-size:13px}' +
    '.gc-mini-list li span{display:block;font-size:12px;color:#7dd3fc;margin-top:2px}' +
    '.gc-mini-list li p{margin:4px 0 0;color:#94a3b8;font-size:12px}' +
    '.gc-schedule-list li{display:flex;gap:8px;align-items:flex-start;padding:6px;border:1px solid rgba(148,163,184,.2);border-radius:10px}' +
    '.gc-schedule-list time{display:inline-flex;min-width:54px;font-size:12px;color:#93c5fd}' +
    '.gc-schedule-list strong{display:block;font-size:13px}' +
    '.gc-schedule-list span{display:block;font-size:12px;color:#94a3b8;margin-top:2px}' +
    '.gc-tag-list li{display:flex;gap:8px;align-items:flex-start;padding:6px;border:1px solid rgba(148,163,184,.2);border-radius:10px}' +
    '.gc-tag-list .level{display:inline-flex;align-items:center;justify-content:center;min-width:28px;height:22px;border-radius:999px;background:rgba(239,68,68,.2);border:1px solid rgba(239,68,68,.5);font-size:12px;color:#fecaca}' +
    '.gc-tag-list p{margin:0;color:#cbd5e1;font-size:12px}' +
    '.gc-todo-list li{display:flex;align-items:center;gap:8px;padding:6px;border:1px solid rgba(148,163,184,.2);border-radius:10px}' +
    '.gc-todo-list li.done span{text-decoration:line-through;color:#64748b}' +
    '.gc-todo-list button{width:24px;height:24px;border-radius:7px;border:1px solid rgba(148,163,184,.35);background:rgba(15,23,42,.72);color:#f8fafc;cursor:pointer}' +
    '.gc-quick-actions{display:flex;flex-wrap:wrap;gap:8px}' +
    '.gc-graph-svg{width:100%;height:154px;border:1px solid rgba(148,163,184,.22);border-radius:12px;background:rgba(2,6,23,.45)}' +
    '.gc-graph-svg line{stroke:rgba(125,211,252,.45);stroke-width:1.2}' +
    '.gc-graph-node circle{fill:rgba(15,118,210,.45);stroke:rgba(125,211,252,.75);stroke-width:.8}' +
    '.gc-graph-node text{fill:#dbeafe;font-size:4px;text-anchor:middle}' +
    '@media (max-width:1280px){.gc-bento-card.span-6{grid-column:span 12}.gc-bento-card.span-4{grid-column:span 6}.gc-bento-card.span-3{grid-column:span 6}}' +
    '@media (max-width:900px){.gc-dashboard-overlay{padding:10px}.gc-dashboard-shell{padding:12px}.gc-bento-grid{grid-template-columns:repeat(1,minmax(0,1fr))}.gc-bento-card.span-6,.gc-bento-card.span-4,.gc-bento-card.span-3{grid-column:span 1}.gc-dashboard-top{flex-direction:column}.gc-dashboard-float{right:14px;bottom:58px}}';
  shadow.appendChild(extraStyle);

  var reportStyle = document.createElement('style');
  reportStyle.textContent =
    '.gc-report-overlay{position:fixed;inset:0;z-index:2147483598;background:rgba(2,6,23,.85);backdrop-filter:blur(6px);padding:16px;display:flex;align-items:center;justify-content:center;color:#e2e8f0;font:14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}' +
    '.gc-report-overlay.hidden{display:none}' +
    '.gc-report-shell{width:min(1240px,96vw);height:min(900px,95vh);display:flex;flex-direction:column;background:rgba(7,12,24,.98);border:1px solid rgba(148,163,184,.32);border-radius:16px;overflow:hidden}' +
    '.gc-report-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(148,163,184,.22);background:rgba(9,15,30,.92)}' +
    '.gc-report-top h2{margin:0;font-size:22px;color:#f8fafc}' +
    '.gc-report-top p{margin:5px 0 0;color:#93c5fd;font-size:13px}' +
    '.gc-report-body{padding:14px;overflow:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}' +
    '.gc-report-page{display:contents}' +
    '.gc-report-card{border:1px solid rgba(148,163,184,.24);border-radius:12px;background:rgba(15,23,42,.62);padding:12px;display:flex;flex-direction:column;gap:8px}' +
    '.gc-report-card h3{margin:0;font-size:16px;color:#f8fafc}' +
    '.gc-report-kv{display:flex;flex-direction:column;gap:4px}' +
    '.gc-report-kv span{font-size:12px;color:#94a3b8}' +
    '.gc-report-kv strong{font-size:14px;color:#f8fafc}' +
    '.gc-report-kv p{margin:0;color:#cbd5e1}' +
    '.gc-report-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}' +
    '.gc-report-list li{display:flex;gap:10px;align-items:flex-start;padding:8px;border:1px solid rgba(148,163,184,.22);border-radius:10px;background:rgba(2,6,23,.42)}' +
    '.gc-report-list time{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;color:#7dd3fc;font-size:12px;min-width:42px}' +
    '.gc-report-list span{color:#dbeafe;font-size:13px;line-height:1.5}' +
    '.gc-report-views{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}' +
    '.gc-report-views figure{margin:0;border:1px solid rgba(148,163,184,.22);border-radius:10px;overflow:hidden;background:rgba(2,6,23,.42)}' +
    '.gc-report-views img{width:100%;height:160px;display:block;object-fit:cover}' +
    '.gc-report-views figcaption{padding:6px 8px;font-size:12px;color:#dbeafe}' +
    '.gc-report-compare{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}' +
    '.gc-report-compare-item{border:1px solid rgba(148,163,184,.24);border-radius:10px;padding:10px;background:rgba(2,6,23,.42);display:flex;flex-direction:column;gap:6px}' +
    '.gc-report-compare-item strong{font-size:13px;color:#f8fafc}' +
    '.gc-report-compare-item p{margin:0;font-size:12px;color:#cbd5e1;line-height:1.45}' +
    '.gc-report-compare-item em{font-style:normal;align-self:flex-start;font-size:11px;color:#7dd3fc;padding:2px 8px;border-radius:999px;border:1px solid rgba(125,211,252,.4)}' +
    '.gc-report-heatmap{display:flex;flex-direction:column;gap:8px}' +
    '.gc-report-heatmap img{width:100%;max-height:380px;object-fit:contain;border-radius:10px;border:1px solid rgba(148,163,184,.24);background:rgba(2,6,23,.76)}' +
    '.gc-report-heatmap p{margin:0;color:#cbd5e1;font-size:13px;line-height:1.5}' +
    '.gc-report-footer{padding:12px 16px;border-top:1px solid rgba(148,163,184,.22);display:flex;justify-content:flex-end;gap:8px;background:rgba(7,12,24,.96)}' +
    '@media (max-width:1100px){.gc-report-body{grid-template-columns:1fr}.gc-report-views,.gc-report-compare{grid-template-columns:1fr}}';
  shadow.appendChild(reportStyle);

  var dashboardOverlay = document.createElement('div');
  dashboardOverlay.id = 'gc-dashboard-overlay';
  dashboardOverlay.className = 'gc-dashboard-overlay';
  dashboardOverlay.innerHTML =
    '<div class="gc-dashboard-shell">' +
    '<div id="gc-dashboard-content"></div>' +
    '</div>';
  shadow.appendChild(dashboardOverlay);

  var dashboardContent = dashboardOverlay.querySelector('#gc-dashboard-content');

  var dashboardBtn = document.createElement('button');
  dashboardBtn.id = 'gc-dashboard-btn';
  dashboardBtn.className = 'gc-dashboard-float';
  dashboardBtn.textContent = '返回看板';
  shadow.appendChild(dashboardBtn);

  var reportOverlay = document.createElement('div');
  reportOverlay.id = 'gc-report-overlay';
  reportOverlay.className = 'gc-report-overlay hidden';
  reportOverlay.innerHTML =
    '<div class="gc-report-shell">' +
    '<div class="gc-report-top">' +
    '<div><h2>完整设计报告（PDF预览）</h2><p>演示页面：整合项目信息、参数元数据、迭代历史、三视图、风格对比与热力图分析。</p></div>' +
    '<button class="gc-close" data-action="report-close">关闭</button>' +
    '</div>' +
    '<div class="gc-report-body" id="gc-report-content"></div>' +
    '<div class="gc-report-footer">' +
    '<button class="gc-btn gc-btn-secondary" data-action="report-close">关闭</button>' +
    '<button class="gc-btn gc-btn-primary" data-action="report-export">导出PDF</button>' +
    '</div>' +
    '</div>';
  shadow.appendChild(reportOverlay);
  var reportContent = reportOverlay.querySelector('#gc-report-content');

  var profileMenuRoot = document.createElement('div');
  profileMenuRoot.id = 'gc-profile-menu-root';
  profileMenuRoot.style.position = 'fixed';
  profileMenuRoot.style.zIndex = '2147483590';
  profileMenuRoot.style.display = 'none';
  document.body.appendChild(profileMenuRoot);

  var globalStyle = document.createElement('style');
  globalStyle.textContent =
    '.gc-topbar-shortcuts{display:inline-flex;align-items:center;gap:8px;margin-right:8px}' +
    '.gc-topbar-shortcuts button{white-space:nowrap}' +
    '.gc-topbar-shortcuts .gc-addon-active{box-shadow:0 0 0 1px rgba(34,211,238,.45) inset}' +
    '.gc-topbar-avatar{cursor:pointer;outline:none}' +
    '.gc-topbar-avatar:focus{box-shadow:0 0 0 2px rgba(59,130,246,.45)}' +
    '.gc-profile-card{width:280px;border:1px solid rgba(148,163,184,.35);border-radius:12px;background:rgba(2,6,23,.95);color:#f8fafc;padding:12px;box-shadow:0 16px 30px rgba(0,0,0,.35);font:13px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}' +
    '.gc-profile-card h4{margin:0;font-size:14px}' +
    '.gc-profile-card p{margin:4px 0 0;color:#94a3b8}' +
    '.gc-profile-meta{margin-top:10px;padding-top:10px;border-top:1px solid rgba(148,163,184,.2);display:flex;flex-direction:column;gap:6px}' +
    '.gc-profile-meta .row{display:flex;justify-content:space-between;gap:8px}' +
    '.gc-profile-actions{margin-top:10px;display:flex;flex-wrap:wrap;gap:6px}' +
    '.gc-profile-actions button{border:1px solid rgba(148,163,184,.35);border-radius:8px;background:rgba(15,23,42,.72);color:#e2e8f0;padding:6px 8px;cursor:pointer}' +
    '.gc-profile-actions button:hover{background:rgba(30,41,59,.9)}' +
    '.gc-profile-switch{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px}' +
    '.gc-settings-hidden{display:none !important}' +
    '.gc-paper-heatmap-overlay,.gc-paper-xai-overlay{position:absolute;inset:0;pointer-events:none}' +
    '.gc-paper-heatmap-node{position:absolute;transform:translate(-50%,-50%);border-radius:999px;border:1px solid rgba(255,255,255,.22);background:radial-gradient(circle, rgba(239,68,68,.68) 0%, rgba(245,158,11,.44) 30%, rgba(56,189,248,.16) 56%, rgba(0,0,0,0) 78%)}' +
    '.gc-paper-heatmap-list{display:flex;flex-direction:column;gap:8px}' +
    '.gc-paper-heatmap-item{padding:10px;border-radius:10px;background:rgba(15,23,42,.55);border:1px solid rgba(148,163,184,.26)}' +
    '.gc-paper-heatmap-item-top{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:#7dd3fc}' +
    '.gc-paper-heatmap-item strong{display:block;font-size:13px;color:#f8fafc;margin:4px 0 2px}' +
    '.gc-paper-heatmap-item p{margin:0;font-size:12px;color:#cbd5e1;line-height:1.45}' +
    '.gc-paper-xai-marker{position:absolute;transform:translate(-50%,-50%);width:32px;height:32px;border-radius:999px;display:flex;align-items:center;justify-content:center;font:700 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;color:#fff;background:rgba(37,99,235,.92);border:1px solid rgba(147,197,253,.5);box-shadow:0 8px 18px rgba(0,0,0,.35)}' +
    '.gc-paper-xai-list{display:flex;flex-direction:column;gap:8px}' +
    '.gc-paper-xai-item{padding:10px;border-radius:10px;background:rgba(15,23,42,.55);border:1px solid rgba(148,163,184,.26)}' +
    '.gc-paper-xai-item-head{display:flex;justify-content:space-between;gap:8px;font-size:12px;color:#93c5fd}' +
    '.gc-paper-xai-item strong{display:block;font-size:13px;color:#f8fafc;margin:4px 0 2px}' +
    '.gc-paper-xai-item p{margin:0;font-size:12px;color:#cbd5e1;line-height:1.45}' +
    '.gc-paper-xai-advice{display:flex;flex-direction:column;gap:8px}' +
    '.gc-paper-xai-advice-item{padding:10px;border-radius:10px;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);font-size:12px;color:#dcfce7;line-height:1.45}' +
    '.gc-case-canvas-overlay{position:absolute;inset:0;width:100%;height:100%;border-radius:8px;object-fit:contain;background:rgba(2,6,23,.86);pointer-events:none;z-index:3}' +
    '.gc-case-hidden{display:none !important}';
  document.head.appendChild(globalStyle);

  function openPanel() {
    state.open = true;
    state.profileMenuOpen = false;
    touchAction('打开评审中心');
    render();
  }

  function closePanel() {
    state.open = false;
    state.profileMenuOpen = false;
    render();
  }

  function openDashboard() {
    state.dashboardOpen = true;
    state.profileMenuOpen = false;
    render();
  }

  function closeDashboard() {
    state.dashboardOpen = false;
    state.profileMenuOpen = false;
    render();
  }

  function openReportOverlay() {
    state.reportOpen = true;
    state.profileMenuOpen = false;
    touchAction('打开完整设计报告');
    render();
  }

  function closeReportOverlay() {
    if (!state.reportOpen) {
      return;
    }
    state.reportOpen = false;
    render();
  }

  function isTopbarExportButton(button) {
    if (!button) {
      return false;
    }
    if (button.getAttribute('code-path') === 'src/components/TopBar.tsx:42:11') {
      return true;
    }
    var text = String(button.textContent || '').trim();
    if (text !== '导出') {
      return false;
    }
    var parent = button.parentElement;
    if (!parent) {
      return false;
    }
    var siblingTexts = Array.prototype.map.call(parent.querySelectorAll('button'), function (item) {
      return String(item.textContent || '').trim();
    });
    return siblingTexts.indexOf('打开') >= 0 && siblingTexts.indexOf('保存') >= 0;
  }

  function isXaiExportButton(button) {
    if (!button) {
      return false;
    }
    if (button.getAttribute('code-path') === 'src/components/XAIReportPanel.tsx:186:11') {
      return true;
    }
    var text = String(button.textContent || '').trim();
    if (text.indexOf('导出报告') < 0) {
      return false;
    }
    return !!button.closest('div[code-path="src/components/XAIReportPanel.tsx:25:5"]');
  }

  function patchXaiFeasibilityCopy() {
    var modal = document.querySelector('div[code-path="src/components/XAIReportPanel.tsx:25:5"]');
    if (!modal) {
      return false;
    }
    var title = modal.querySelector('h2[code-path="src/components/XAIReportPanel.tsx:34:15"]');
    var subtitle = modal.querySelector('p[code-path="src/components/XAIReportPanel.tsx:35:15"]');
    var changed = false;
    if (title && title.textContent !== '可行性分析报告') {
      title.textContent = '可行性分析报告';
      changed = true;
    }
    if (subtitle && subtitle.textContent !== '基于侧视图的空气动力学可行性分析与方案建议') {
      subtitle.textContent = '基于侧视图的空气动力学可行性分析与方案建议';
      changed = true;
    }
    Array.prototype.forEach.call(modal.querySelectorAll('p,span,strong,button,h3,h4'), function (node) {
      var text = String(node.textContent || '');
      if (!text) {
        return;
      }
      if (text.indexOf('可解释性') < 0 && text.indexOf('XAI') < 0) {
        return;
      }
      var replaced = text.replace(/可解释性/g, '可行性').replace(/XAI/g, '可行性分析');
      if (replaced !== text) {
        node.textContent = replaced;
        changed = true;
      }
    });
    if (changed) {
      modal.dataset.gcFeasibilityCopyPatched = '1';
    }
    return true;
  }

  function patchFeasibilityActionButtons() {
    Array.prototype.forEach.call(document.querySelectorAll('button'), function (button) {
      var text = String(button.textContent || '').trim();
      if (text === '运行XAI分析') {
        button.textContent = '运行可行性分析';
      }
    });
  }

  function bindReportEntryButtons() {
    var topbarExport = document.querySelector('button[code-path="src/components/TopBar.tsx:42:11"]');
    if (!topbarExport) {
      var candidates = Array.prototype.slice.call(document.querySelectorAll('button'));
      topbarExport =
        candidates.find(function (button) {
          return isTopbarExportButton(button);
        }) || null;
    }
    if (topbarExport && topbarExport.dataset.gcReportBound !== '1') {
      topbarExport.dataset.gcReportBound = '1';
      topbarExport.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          openReportOverlay();
        },
        true
      );
    }

    Array.prototype.forEach.call(document.querySelectorAll('button'), function (button) {
      if (!isXaiExportButton(button) || button.dataset.gcReportBound === '1') {
        return;
      }
      button.dataset.gcReportBound = '1';
      button.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          openReportOverlay();
        },
        true
      );
    });
  }

  function getSettingsButton() {
    return (
      document.querySelector('button[code-path="src/components/TopBar.tsx:85:9"]') ||
      document.querySelector('button[aria-label="设置"]') ||
      document.querySelector('button[title="设置"]')
    );
  }

  function getAvatarElement() {
    return (
      document.querySelector('div[code-path="src/components/TopBar.tsx:88:9"]') ||
      document.querySelector('[data-testid="topbar-avatar"]')
    );
  }

  function getAdminButton() {
    var fixed = document.querySelector('button[code-path="src/components/TopBar.tsx:73:9"]');
    if (fixed) {
      return fixed;
    }
    var buttons = Array.prototype.slice.call(document.querySelectorAll('button'));
    return (
      buttons.find(function (item) {
        return String(item.textContent || '').trim() === '后台';
      }) || null
    );
  }

  function hideTopbarSettingsButton() {
    var settingsButton = getSettingsButton();
    if (!settingsButton) {
      return;
    }
    settingsButton.classList.add('gc-settings-hidden');
    settingsButton.setAttribute('aria-hidden', 'true');
    settingsButton.setAttribute('tabindex', '-1');
  }

  function normalizeViewKey(text) {
    var value = String(text || '')
      .trim()
      .toLowerCase();
    if (!value) {
      return '';
    }
    if (value.indexOf('前') >= 0 || value === 'front') {
      return 'front';
    }
    if (value.indexOf('侧') >= 0 || value === 'side') {
      return 'side';
    }
    if (value.indexOf('后') >= 0 || value === 'rear' || value === 'back') {
      return 'rear';
    }
    if (value.indexOf('透视') >= 0 || value === 'perspective') {
      return 'perspective';
    }
    return '';
  }

  function setNativeValue(element, value) {
    if (!element) {
      return false;
    }
    var tagName = String(element.tagName || '').toLowerCase();
    var prototype = tagName === 'textarea' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
    var descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
    if (descriptor && descriptor.set) {
      descriptor.set.call(element, value);
    } else {
      element.value = value;
    }
    return true;
  }

  function setPromptValue(value) {
    var promptInput = document.querySelector('textarea[code-path="src/components/PromptPanel.tsx:60:9"]');
    if (!promptInput) {
      return false;
    }
    if (promptInput.value === value) {
      return true;
    }
    setNativeValue(promptInput, value);
    promptInput.dispatchEvent(new Event('input', { bubbles: true }));
    promptInput.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function ensureScenarioPromptDefault() {
    var promptInput = document.querySelector('textarea[code-path="src/components/PromptPanel.tsx:60:9"]');
    if (!promptInput) {
      return false;
    }
    if (!state.scenarioPromptApplied) {
      state.scenarioPromptApplied = true;
      state.scenarioPromptOptimized = false;
      setPromptValue(CASE_PROMPT_SHORT_CN);
      return true;
    }
    if (!state.scenarioPromptOptimized && !String(promptInput.value || '').trim()) {
      setPromptValue(CASE_PROMPT_SHORT_CN);
    }
    return true;
  }

  function renderPromptKeywordChips() {
    return CASE_PROMPT_KEYWORDS.map(function (item) {
      return (
        '<div class="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-xs">' +
        '<span>' +
        escapeHtml(item.word) +
        '</span>' +
        '<div class="w-8 h-1.5 rounded-full bg-muted overflow-hidden" title="权重: ' +
        Math.round(item.weight * 100) +
        '%">' +
        '<div class="h-full bg-gradient-to-r from-purple-500 to-pink-500" style="width:' +
        Math.round(item.weight * 100) +
        '%"></div>' +
        '</div>' +
        '</div>'
      );
    }).join('');
  }

  function patchPromptRefinerResultPanel() {
    var resultPanel = document.querySelector('div[code-path="src/components/PromptRefiner.tsx:157:13"]');
    if (!resultPanel) {
      return false;
    }

    var originalText = resultPanel.querySelector('p[code-path="src/components/PromptRefiner.tsx:161:17"]');
    var expandedText = resultPanel.querySelector('p[code-path="src/components/PromptRefiner.tsx:185:17"]');
    var keywordHost = resultPanel.querySelector('div[code-path="src/components/PromptRefiner.tsx:191:17"]');
    var applyButton = resultPanel.querySelector('button[code-path="src/components/PromptRefiner.tsx:214:17"]');

    if (originalText) {
      originalText.textContent = CASE_PROMPT_SHORT_CN;
    }
    if (expandedText) {
      expandedText.textContent = CASE_PROMPT_LONG_EN;
    }
    if (keywordHost) {
      keywordHost.innerHTML = renderPromptKeywordChips();
    }

    if (applyButton && applyButton.dataset.gcCaseApplyBound !== '1') {
      applyButton.dataset.gcCaseApplyBound = '1';
      applyButton.addEventListener(
        'click',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          state.scenarioPromptOptimized = true;
          state.scenarioOptimizePending = false;
          setPromptValue(CASE_PROMPT_LONG_EN);
          touchAction('应用优化提示词');
          addToast('已应用优化结果', 'success');
          var toggleButton = document.querySelector('button[code-path="src/components/PromptRefiner.tsx:115:7"]');
          if (toggleButton) {
            window.setTimeout(function () {
              toggleButton.click();
            }, 0);
          }
        },
        true
      );
    }
    return true;
  }

  function schedulePromptRefinerPatch() {
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      if (patchPromptRefinerResultPanel() || attempts >= 28) {
        state.scenarioOptimizePending = false;
        window.clearInterval(timer);
      }
    }, 90);
  }

  function patchPromptOptimizerButton() {
    var optimizeButton = document.querySelector('button[code-path="src/components/PromptRefiner.tsx:135:13"]');
    if (!optimizeButton) {
      return false;
    }
    if (optimizeButton.dataset.gcCasePromptBound === '1') {
      return true;
    }
    optimizeButton.dataset.gcCasePromptBound = '1';
    optimizeButton.addEventListener(
      'click',
      function () {
        state.scenarioOptimizePending = true;
        state.scenarioPromptOptimized = false;
        schedulePromptRefinerPatch();
      },
      true
    );
    return true;
  }

  function getCanvasTabs() {
    return Array.prototype.slice.call(document.querySelectorAll('button[code-path="src/components/Canvas.tsx:193:11"]'));
  }

  function findCanvasTab(viewKey) {
    var tabs = getCanvasTabs();
    for (var i = 0; i < tabs.length; i += 1) {
      if (normalizeViewKey(tabs[i].textContent) === viewKey) {
        return tabs[i];
      }
    }
    return null;
  }

  function isTabActive(tab) {
    if (!tab) {
      return false;
    }
    var className = String(tab.className || '');
    return className.indexOf('bg-blue-500/20') >= 0 || className.indexOf('text-blue-400') >= 0;
  }

  function ensureCanvasOverlayImage() {
    var canvasHost = document.querySelector('div[code-path="src/components/Canvas.tsx:214:11"]');
    if (!canvasHost) {
      return null;
    }
    var overlayImage = canvasHost.querySelector('#gc-case-canvas-overlay');
    if (!overlayImage) {
      overlayImage = document.createElement('img');
      overlayImage.id = 'gc-case-canvas-overlay';
      overlayImage.className = 'gc-case-canvas-overlay';
      overlayImage.alt = 'Case View';
      canvasHost.appendChild(overlayImage);
    }
    return overlayImage;
  }

  function applyCanvasScenarioImage(viewKey) {
    if (!CASE_VIEW_IMAGES[viewKey]) {
      return false;
    }
    var overlayImage = ensureCanvasOverlayImage();
    if (!overlayImage) {
      return false;
    }
    var src = CASE_VIEW_IMAGES[viewKey];
    var alt = CASE_VIEW_LABELS[viewKey] || viewKey;
    if (overlayImage.getAttribute('src') !== src) {
      overlayImage.setAttribute('src', src);
    }
    if (overlayImage.getAttribute('alt') !== alt) {
      overlayImage.setAttribute('alt', alt);
    }
    if (overlayImage.style.display !== 'block') {
      overlayImage.style.display = 'block';
    }
    if (state.scenarioActiveView !== viewKey) {
      state.scenarioActiveView = viewKey;
    }
    return true;
  }

  function bindHistoryCard(card, viewKey) {
    if (!card || !viewKey || card.dataset.gcCaseViewBound === '1') {
      return;
    }
    card.dataset.gcCaseViewBound = '1';
    card.addEventListener('click', function () {
      state.scenarioActiveView = viewKey;
      applyCanvasScenarioImage(viewKey);
      var tab = findCanvasTab(viewKey);
      if (tab && !isTabActive(tab)) {
        tab.click();
      }
    });
  }

  function patchHistoryViewCards() {
    var cards = Array.prototype.slice.call(
      document.querySelectorAll('div[code-path="src/components/PromptPanel.tsx:158:17"]')
    );
    if (cards.length === 0) {
      return false;
    }

    var fallback = ['rear', 'side', 'front'];
    cards.forEach(function (card, index) {
      var badge = card.querySelector('div[code-path="src/components/PromptPanel.tsx:175:19"]');
      var image = card.querySelector('img[code-path="src/components/PromptPanel.tsx:168:19"]');
      var key = normalizeViewKey(badge ? badge.textContent : '');
      if (!key) {
        key = fallback[index] || '';
      }
      if (!CASE_VIEW_IMAGES[key]) {
        return;
      }
      card.dataset.gcCaseViewKey = key;
      if (badge && badge.textContent !== key) {
        badge.textContent = key;
      }
      if (image) {
        var src = CASE_VIEW_IMAGES[key];
        var alt = CASE_VIEW_LABELS[key] || key;
        if (image.getAttribute('src') !== src) {
          image.setAttribute('src', src);
        }
        if (image.getAttribute('alt') !== alt) {
          image.setAttribute('alt', alt);
        }
      }
      bindHistoryCard(card, key);
    });
    return true;
  }

  function patchCanvasViewTabs() {
    var tabs = getCanvasTabs();
    if (tabs.length === 0) {
      return false;
    }
    var activeKey = '';
    var perspectiveActive = false;
    tabs.forEach(function (tab) {
      var key = normalizeViewKey(tab.textContent);
      if (key === 'perspective') {
        if (isTabActive(tab)) {
          perspectiveActive = true;
        }
        tab.classList.add('gc-case-hidden');
        return;
      }
      tab.classList.remove('gc-case-hidden');
      if (isTabActive(tab)) {
        activeKey = key;
      }
      if (tab.dataset.gcCaseTabBound === '1') {
        return;
      }
      tab.dataset.gcCaseTabBound = '1';
      tab.addEventListener('click', function () {
        state.scenarioActiveView = key;
        window.setTimeout(function () {
          applyCanvasScenarioImage(key);
        }, 0);
      });
    });

    if (perspectiveActive && state.scenarioActiveView !== 'front') {
      state.scenarioActiveView = 'front';
      var frontTab = findCanvasTab('front');
      if (frontTab) {
        frontTab.click();
        activeKey = 'front';
      }
    }
    if (!activeKey) {
      activeKey = state.scenarioActiveView || 'front';
    }
    applyCanvasScenarioImage(activeKey);
    return true;
  }

  function patchWorkbenchScenario() {
    ensureScenarioPromptDefault();
    patchPromptOptimizerButton();
    patchPromptRefinerResultPanel();
    patchHistoryViewCards();
    patchCanvasViewTabs();
  }

  function applyPaperHeatmapPatch() {
    var modal = document.querySelector('div[code-path="src/components/AttentionHeatmap.tsx:222:5"]');
    if (!modal) {
      return false;
    }
    if (modal.dataset.gcPaperHeatmapPatched === '1') {
      return true;
    }

    var image = modal.querySelector('img[code-path="src/components/AttentionHeatmap.tsx:249:17"]');
    var stage = modal.querySelector('div[code-path="src/components/AttentionHeatmap.tsx:247:15"]');
    var svg = modal.querySelector('svg[code-path="src/components/AttentionHeatmap.tsx:256:17"]');
    var interactive = modal.querySelector('div[code-path="src/components/AttentionHeatmap.tsx:331:17"]');
    var promptText = modal.querySelector('p[code-path="src/components/AttentionHeatmap.tsx:436:17"]');
    var keywordHost = modal.querySelector('div[code-path="src/components/AttentionHeatmap.tsx:446:17"]');
    if (!image || !stage || !promptText || !keywordHost) {
      return false;
    }

    modal.dataset.gcPaperHeatmapPatched = '1';
    image.src = './assets/heatmap-manual.jpg';
    image.alt = 'Manual Heatmap';
    image.style.objectFit = 'contain';
    stage.style.position = 'relative';
    stage.style.background = 'rgba(2,6,23,.9)';
    stage.style.borderRadius = '14px';
    stage.style.overflow = 'hidden';
    if (svg) {
      svg.style.display = 'none';
    }
    if (interactive) {
      interactive.style.display = 'none';
    }

    var overlay = stage.querySelector('.gc-paper-heatmap-overlay');
    if (overlay) {
      overlay.innerHTML = '';
      overlay.style.display = 'none';
    }

    promptText.textContent = PAPER_HEATMAP_PROMPT;
    keywordHost.innerHTML =
      '<div class="gc-paper-heatmap-list">' +
      PAPER_HEATMAP_REGIONS.map(function (item) {
        return (
          '<div class="gc-paper-heatmap-item">' +
          '<div class="gc-paper-heatmap-item-top"><span>权重 ' +
          Math.round(item.weight * 100) +
          '%</span><span>区域映射</span></div>' +
          '<strong>' +
          escapeHtml(item.word) +
          '</strong>' +
          '<p>对应区域：' +
          escapeHtml(item.focus) +
          '</p>' +
          '<p>' +
          escapeHtml(item.note) +
          '</p>' +
          '</div>'
        );
      }).join('') +
      '</div>';
    return true;
  }

  function applyPaperXaiPatch() {
    var modal = document.querySelector('div[code-path="src/components/XAIReportPanel.tsx:25:5"]');
    if (!modal) {
      return false;
    }
    if (modal.dataset.gcPaperXaiPatched === '1') {
      return true;
    }

    var title = modal.querySelector('h2[code-path="src/components/XAIReportPanel.tsx:34:15"]');
    var subtitle = modal.querySelector('p[code-path="src/components/XAIReportPanel.tsx:35:15"]');
    var stage = modal.querySelector('div[code-path="src/components/XAIReportPanel.tsx:128:17"]');
    var image = modal.querySelector('img[code-path="src/components/XAIReportPanel.tsx:129:19"]');
    var problemHost = modal.querySelector('div[code-path="src/components/XAIReportPanel.tsx:88:15"]');
    var adviceHost = modal.querySelector('div[code-path="src/components/XAIReportPanel.tsx:155:15"]');
    var prediction = modal.querySelector('div[code-path="src/components/XAIReportPanel.tsx:167:15"]');
    if (!stage || !image || !problemHost || !adviceHost) {
      return false;
    }

    modal.dataset.gcPaperXaiPatched = '1';
    if (title) {
      title.textContent = '可行性分析报告';
    }
    if (subtitle) {
      subtitle.textContent = '基于侧视图的空气动力学可行性分析与方案建议';
    }

    image.src = './assets/case-side.jpg';
    image.alt = 'Side View Aerodynamics';
    image.style.objectFit = 'contain';
    image.style.background = 'rgba(2,6,23,.9)';
    stage.style.position = 'relative';
    stage.style.background = 'rgba(2,6,23,.9)';
    stage.style.borderRadius = '14px';
    stage.style.overflow = 'hidden';

    Array.prototype.forEach.call(
      stage.querySelectorAll(
        '[code-path="src/components/XAIReportPanel.tsx:138:19"],[code-path="src/components/XAIReportPanel.tsx:141:19"]'
      ),
      function (node) {
        node.style.display = 'none';
      }
    );

    var overlay = stage.querySelector('.gc-paper-xai-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'gc-paper-xai-overlay';
      stage.appendChild(overlay);
    }
    overlay.innerHTML = PAPER_XAI_MARKERS.map(function (item) {
      return (
        '<div class="gc-paper-xai-marker" style="left:' +
        item.left +
        '%;top:' +
        item.top +
        '%;">' +
        item.id +
        '</div>'
      );
    }).join('');

    problemHost.innerHTML =
      '<div class="gc-paper-xai-list">' +
      PAPER_XAI_MARKERS.map(function (item) {
        return (
          '<div class="gc-paper-xai-item">' +
          '<div class="gc-paper-xai-item-head"><span>#' +
          item.id +
          '</span><span>' +
          escapeHtml(item.level) +
          '</span></div>' +
          '<strong>' +
          escapeHtml(item.title) +
          '</strong>' +
          '<p>' +
          escapeHtml(item.issue) +
          '</p>' +
          '</div>'
        );
      }).join('') +
      '</div>';

    adviceHost.innerHTML =
      '<div class="gc-paper-xai-advice">' +
      PAPER_XAI_MARKERS.map(function (item) {
        return (
          '<div class="gc-paper-xai-advice-item"><strong>#' +
          item.id +
          ' 建议：</strong>' +
          escapeHtml(item.advice) +
          '</div>'
        );
      }).join('') +
      '</div>';

    if (prediction) {
      prediction.innerHTML =
        '<p class="text-sm text-blue-400"><span class="font-medium">结论：</span>当前方案整体气动趋势可控，重点优化 #1 与 #2 区域后，预估可获得更稳定的侧向附着与更低的阻力损失。</p>';
    }
    return true;
  }

  function schedulePaperPatch(type) {
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      var done = type === 'heatmap' ? applyPaperHeatmapPatch() : applyPaperXaiPatch();
      if (done || attempts >= 24) {
        window.clearInterval(timer);
      }
    }, 80);
  }

  function renderProfileMenu() {
    if (!state.profileMenuOpen) {
      profileMenuRoot.style.display = 'none';
      profileMenuRoot.innerHTML = '';
      return;
    }

    var avatar = getAvatarElement();
    if (!avatar) {
      state.profileMenuOpen = false;
      profileMenuRoot.style.display = 'none';
      profileMenuRoot.innerHTML = '';
      return;
    }

    var rect = avatar.getBoundingClientRect();
    var left = rect.right - 280;
    if (left < 8) {
      left = 8;
    }
    var maxLeft = window.innerWidth - 288;
    if (left > maxLeft) {
      left = maxLeft;
    }
    profileMenuRoot.style.display = 'block';
    profileMenuRoot.style.left = left + 'px';
    profileMenuRoot.style.top = rect.bottom + 8 + 'px';
    profileMenuRoot.innerHTML =
      '<div class="gc-profile-card">' +
      '<h4>个人设置</h4>' +
      '<p>设置入口已迁移至个人头像菜单</p>' +
      '<div class="gc-profile-meta">' +
      '<div class="row"><span>账号</span><strong>JD / hongwifi</strong></div>' +
      '<div class="row"><span>角色</span><strong>设计评审成员</strong></div>' +
      '<div class="row"><span>主题</span><strong>深色</strong></div>' +
      '<div class="row"><span>快捷键</span><strong>1-5评分 / ←→切图</strong></div>' +
      '</div>' +
      '<label class="gc-profile-switch">' +
      '<span>通知提醒</span>' +
      '<input type="checkbox" data-action="profile-toggle-notify" ' +
      (state.notifyEnabled ? 'checked' : '') +
      ' />' +
      '</label>' +
      '<div class="gc-profile-actions">' +
      '<button data-action="profile-info">个人信息</button>' +
      '<button data-action="profile-open-admin">进入后台设置</button>' +
      '<button data-action="profile-close">关闭</button>' +
      '</div>' +
      '</div>';
  }

  function toggleProfileMenu() {
    state.profileMenuOpen = !state.profileMenuOpen;
    render();
  }

  function enhanceAvatar() {
    var avatar = getAvatarElement();
    if (!avatar) {
      return;
    }

    avatar.classList.add('gc-topbar-avatar');
    avatar.setAttribute('role', 'button');
    avatar.setAttribute('tabindex', '0');
    avatar.setAttribute('aria-haspopup', 'menu');
    avatar.setAttribute('aria-expanded', state.profileMenuOpen ? 'true' : 'false');

    if (avatar.dataset.gcBound === '1') {
      return;
    }
    avatar.dataset.gcBound = '1';

    avatar.addEventListener('click', function (event) {
      event.stopPropagation();
      toggleProfileMenu();
    });
    avatar.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleProfileMenu();
      }
    });
  }

  function openPanelFromTopbar() {
    state.open = true;
    state.dashboardOpen = false;
    state.profileMenuOpen = false;
    touchAction('顶部进入评审中心');
    render();
  }

  function openDashboardFromTopbar() {
    state.open = false;
    state.dashboardOpen = true;
    state.profileMenuOpen = false;
    touchAction('顶部返回看板');
    render();
  }

  function ensureTopbarShortcutButtons() {
    var adminButton = getAdminButton();
    if (!adminButton || !adminButton.parentElement) {
      return false;
    }
    var parent = adminButton.parentElement;
    var shortcutHost = document.getElementById('gc-topbar-shortcuts');

    if (!shortcutHost) {
      shortcutHost = document.createElement('div');
      shortcutHost.id = 'gc-topbar-shortcuts';
      shortcutHost.className = 'gc-topbar-shortcuts';

      var dashboardTopBtn = document.createElement('button');
      dashboardTopBtn.id = 'gc-topbar-dashboard-btn';
      dashboardTopBtn.type = 'button';
      dashboardTopBtn.textContent = '返回看板';
      dashboardTopBtn.addEventListener('click', openDashboardFromTopbar);

      var reviewTopBtn = document.createElement('button');
      reviewTopBtn.id = 'gc-topbar-review-btn';
      reviewTopBtn.type = 'button';
      reviewTopBtn.textContent = '评审中心';
      reviewTopBtn.addEventListener('click', openPanelFromTopbar);

      shortcutHost.appendChild(dashboardTopBtn);
      shortcutHost.appendChild(reviewTopBtn);
      parent.insertBefore(shortcutHost, adminButton);
    } else if (shortcutHost.parentElement !== parent) {
      parent.insertBefore(shortcutHost, adminButton);
    }

    var buttonClass = adminButton.className || '';
    var dashboardButton = shortcutHost.querySelector('#gc-topbar-dashboard-btn');
    var reviewButton = shortcutHost.querySelector('#gc-topbar-review-btn');
    if (dashboardButton) {
      dashboardButton.className = buttonClass;
      dashboardButton.classList.toggle('gc-addon-active', state.dashboardOpen && !state.open);
    }
    if (reviewButton) {
      reviewButton.className = buttonClass;
      reviewButton.classList.toggle('gc-addon-active', state.open);
    }
    return true;
  }

  function patchTopbar() {
    hideTopbarSettingsButton();
    enhanceAvatar();
    return ensureTopbarShortcutButtons();
  }

  function resetSession() {
    if (state.session && state.session.images) {
      state.session.images.forEach(function (image) {
        if (image.objectUrl) {
          try {
            URL.revokeObjectURL(image.objectUrl);
          } catch (error) {
            // ignore
          }
        }
      });
    }

    state.step = 1;
    state.session = null;
    state.selectedImageIds = [];
    state.anchorImageId = null;
    state.activeImageId = null;
    state.viewMode = 'GRID';
    state.annotationTool = null;
    touchAction('重置评审会');
  }

  function handleFileUpload(fileList) {
    if (!state.session || !fileList || fileList.length === 0) {
      return;
    }

    var invalidCount = 0;
    var maxCount = 20;
    var remain = maxCount - state.session.images.length;

    if (remain <= 0) {
      addToast('最多上传 20 张图片', 'error');
      return;
    }

    Array.prototype.forEach.call(fileList, function (file) {
      if (!/^image\/(png|jpeg|jpg|webp)$/.test(file.type)) {
        invalidCount += 1;
        return;
      }

      if (remain <= 0) {
        return;
      }

      var objectUrl = URL.createObjectURL(file);
      var image = {
        id: createId('review-image'),
        url: objectUrl,
        thumbnail: objectUrl,
        objectUrl: objectUrl,
        name: file.name,
        annotations: [],
        rating: null,
        decision: null,
        comments: '',
        reviewed: false
      };

      state.session.images.push(image);
      remain -= 1;
    });

    if (state.session.images.length > 0 && !state.activeImageId) {
      state.activeImageId = state.session.images[0].id;
      state.selectedImageIds = [state.activeImageId];
      state.anchorImageId = state.activeImageId;
    }

    if (invalidCount > 0) {
      addToast('部分文件格式不支持，已自动忽略', 'error');
    }

    if (remain === 0 && state.session.images.length >= maxCount) {
      addToast('已达到最多 20 张图片', 'info');
    }

    render();
  }

  function handleAction(action, element, event) {
    if (action === 'report-close') {
      closeReportOverlay();
      return;
    }

    if (action === 'report-export') {
      addToast('已导出完整设计报告 PDF', 'success');
      touchAction('导出完整设计报告');
      return;
    }

    if (action === 'dashboard-go-workbench') {
      closeDashboard();
      state.profileMenuOpen = false;
      touchAction('进入工作台');
      return;
    }

    if (action === 'dashboard-open-review') {
      state.open = true;
      state.profileMenuOpen = false;
      touchAction('从看板进入评审中心');
      render();
      return;
    }

    if (action === 'dashboard-open-admin') {
      closeDashboard();
      var adminButton = getAdminButton();
      if (adminButton) {
        adminButton.click();
      }
      touchAction('打开后台设置');
      return;
    }

    if (action === 'dashboard-refresh') {
      touchAction('刷新看板');
      addToast('看板数据已刷新', 'info');
      render();
      return;
    }

    if (action === 'dashboard-toggle-todo') {
      var todoIndex = Number(element.getAttribute('data-todo-index'));
      if (!isNaN(todoIndex) && state.dashboardTodos[todoIndex]) {
        state.dashboardTodos[todoIndex].done = !state.dashboardTodos[todoIndex].done;
        touchAction('更新待办状态');
        render();
      }
      return;
    }

    if (action === 'profile-info') {
      addToast('个人信息面板已打开（模拟）', 'info');
      state.profileMenuOpen = false;
      touchAction('查看个人信息');
      render();
      return;
    }

    if (action === 'profile-open-admin') {
      state.profileMenuOpen = false;
      closeDashboard();
      var admin = getAdminButton();
      if (admin) {
        admin.click();
      }
      touchAction('从头像菜单进入后台设置');
      return;
    }

    if (action === 'profile-close') {
      state.profileMenuOpen = false;
      render();
      return;
    }

    if (action === 'profile-toggle-notify') {
      state.notifyEnabled = !!element.checked;
      touchAction('切换通知设置');
      addToast(state.notifyEnabled ? '已开启通知提醒' : '已关闭通知提醒', 'info');
      render();
      return;
    }

    if (action === 'set-step') {
      var stepValue = Number(element.getAttribute('data-step'));
      if (stepValue >= 1 && stepValue <= 4) {
        state.step = stepValue;
        touchAction('切换评审步骤到 Step ' + stepValue);
        render();
      }
      return;
    }

    if (action === 'select-project') {
      state.selectedProjectId = element.getAttribute('data-project-id');
      touchAction('选择项目');
      render();
      return;
    }

    if (action === 'create-session') {
      var projectId = element.getAttribute('data-project-id') || state.selectedProjectId;
      if (!projectId) {
        var filtered = getFilteredProjects();
        if (filtered.length > 0) {
          projectId = filtered[0].id;
        }
      }
      if (!projectId) {
        addToast('没有可用于创建评审的项目', 'error');
        return;
      }
      state.selectedProjectId = projectId;
      state.session = createSession(projectId);
      state.step = 2;
      state.selectedImageIds = [];
      state.anchorImageId = null;
      state.activeImageId = null;
      state.annotationTool = null;
      touchAction('创建评审会');
      render();
      return;
    }

    if (action === 'open-uploader') {
      fileInput.value = '';
      fileInput.click();
      return;
    }

    if (action === 'remove-upload') {
      if (!state.session) {
        return;
      }
      var removeId = element.getAttribute('data-image-id');
      state.session.images = state.session.images.filter(function (image) {
        if (image.id === removeId && image.objectUrl) {
          try {
            URL.revokeObjectURL(image.objectUrl);
          } catch (error) {
            // ignore
          }
        }
        return image.id !== removeId;
      });
      state.selectedImageIds = state.selectedImageIds.filter(function (id) {
        return id !== removeId;
      });
      if (state.activeImageId === removeId) {
        state.activeImageId = state.session.images[0] ? state.session.images[0].id : null;
      }
      if (!state.anchorImageId || state.anchorImageId === removeId) {
        state.anchorImageId = state.session.images[0] ? state.session.images[0].id : null;
      }
      touchAction('移除上传图片');
      render();
      return;
    }

    if (action === 'start-review') {
      if (!state.session || state.session.images.length === 0) {
        addToast('请先上传至少一张图片', 'error');
        return;
      }
      var project = state.projects.find(function (item) {
        return item.id === state.session.projectId;
      });
      if (!state.session.title) {
        state.session.title = (project ? project.name : '项目') + '评审会议';
      }
      state.session.status = 'IN_PROGRESS';
      state.step = 3;
      state.activeImageId = state.session.images[0].id;
      state.anchorImageId = state.activeImageId;
      state.selectedImageIds = [state.activeImageId];
      state.viewMode = 'GRID';
      touchAction('进入评审会议');
      render();
      return;
    }

    if (action === 'set-view-mode') {
      state.viewMode = element.getAttribute('data-view-mode') || 'GRID';
      touchAction('切换视图模式');
      render();
      return;
    }

    if (action === 'select-image') {
      var imageId = element.getAttribute('data-image-id');
      selectImage(imageId, event);
      return;
    }

    if (action === 'set-tool') {
      var tool = element.getAttribute('data-tool');
      state.annotationTool = state.annotationTool === tool ? null : tool;
      touchAction('切换批注工具');
      render();
      return;
    }

    if (action === 'set-rating') {
      var rating = Number(element.getAttribute('data-rating'));
      touchAction('图片评分 ' + rating + ' 星');
      updateActiveImage(function (image) {
        image.rating = rating;
      });
      return;
    }

    if (action === 'set-decision') {
      var decision = element.getAttribute('data-decision');
      touchAction('设置评审决策');
      updateActiveImage(function (image) {
        image.decision = decision;
      });
      return;
    }

    if (action === 'prev-image') {
      goPrevImage();
      return;
    }

    if (action === 'next-image') {
      goNextImage();
      return;
    }

    if (action === 'open-minutes') {
      state.step = 4;
      addToast('已进入评审纪要', 'success');
      touchAction('进入评审纪要');
      render();
      return;
    }

    if (action === 'mock-export') {
      addToast('已模拟导出 PDF/Word 纪要', 'success');
      touchAction('导出评审纪要');
      return;
    }

    if (action === 'mock-notify') {
      addToast('已模拟发送评审通知', 'success');
      touchAction('发送评审通知');
      return;
    }

    if (action === 'complete-session') {
      if (state.session) {
        state.session.status = 'COMPLETED';
        state.session.completedAt = new Date();
      }
      addToast('评审已完成', 'success');
      touchAction('完成评审');
      render();
      return;
    }

    if (action === 'restart') {
      resetSession();
      addToast('已返回评审项目选择页', 'info');
      render();
      return;
    }

    if (action === 'canvas-click') {
      if (!state.annotationTool || !state.session || state.viewMode !== 'SINGLE') {
        return;
      }
      var active = getActiveImage();
      if (!active) {
        return;
      }
      var rect = element.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;

      if (x < 0 || x > 1 || y < 0 || y > 1) {
        return;
      }

      var annotation = {
        id: createId('annotation'),
        type: state.annotationTool,
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
        color: state.annotationColor,
        content: ''
      };

      if (state.annotationTool === 'text') {
        var text = window.prompt('请输入批注内容');
        if (!text) {
          return;
        }
        annotation.content = text;
      }

      active.annotations.push(annotation);
      markReviewed(active);
      touchAction('添加图片批注');
      render();
      return;
    }
  }

  function handleInput(bind, element) {
    if (bind === 'query') {
      state.query = element.value;
      render();
      return;
    }

    if (bind === 'title') {
      if (state.session) {
        state.session.title = element.value;
      }
      return;
    }

    if (bind === 'specialty') {
      if (state.session) {
        state.session.specialty = element.value;
      }
      return;
    }

    if (bind === 'compare-split') {
      state.compareSplit = Number(element.value);
      render();
      return;
    }

    if (bind === 'annotation-color') {
      state.annotationColor = element.value;
      return;
    }

    if (bind === 'active-comment') {
      touchAction('更新评审建议');
      updateActiveImage(function (image) {
        image.comments = element.value;
      });
    }
  }

  function bindEvents() {
    launchBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    dashboardBtn.addEventListener('click', openDashboard);

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closePanel();
      }
    });

    reportOverlay.addEventListener('click', function (event) {
      if (event.target === reportOverlay) {
        closeReportOverlay();
      }
    });

    shadow.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var actionElement = target.closest('[data-action]');
      if (!actionElement) {
        return;
      }
      var action = actionElement.getAttribute('data-action');
      handleAction(action, actionElement, event);
    });

    shadow.addEventListener('input', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var bind = target.getAttribute('data-bind');
      if (!bind) {
        return;
      }
      handleInput(bind, target);
    });

    shadow.addEventListener('change', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var bind = target.getAttribute('data-bind');
      if (!bind) {
        return;
      }
      handleInput(bind, target);
    });

    fileInput.addEventListener('change', function () {
      handleFileUpload(fileInput.files);
    });

    profileMenuRoot.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (
        target.tagName === 'INPUT' &&
        ((target.type && target.type.toLowerCase() === 'checkbox') ||
          (target.type && target.type.toLowerCase() === 'radio'))
      ) {
        return;
      }
      var actionElement = target.closest('[data-action]');
      if (!actionElement) {
        return;
      }
      var action = actionElement.getAttribute('data-action');
      handleAction(action, actionElement, event);
    });

    profileMenuRoot.addEventListener('change', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var action = target.getAttribute('data-action');
      if (!action) {
        return;
      }
      handleAction(action, target, event);
    });

    document.addEventListener('click', function (event) {
      if (!state.profileMenuOpen) {
        return;
      }
      var target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      var avatar = getAvatarElement();
      if (profileMenuRoot.contains(target) || (avatar && avatar.contains(target))) {
        return;
      }
      state.profileMenuOpen = false;
      render();
    });

    document.addEventListener('click', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var button = target.closest('button');
      if (!button) {
        return;
      }
      if (isTopbarExportButton(button) || isXaiExportButton(button)) {
        event.preventDefault();
        event.stopPropagation();
        openReportOverlay();
        return;
      }
      var text = String(button.textContent || '').trim();
      if (text.indexOf('交叉注意力热力图') >= 0) {
        window.setTimeout(function () {
          schedulePaperPatch('heatmap');
        }, 20);
        return;
      }
      if (text.indexOf('运行XAI分析') >= 0 || text.indexOf('运行可行性分析') >= 0) {
        window.setTimeout(function () {
          schedulePaperPatch('xai');
          patchXaiFeasibilityCopy();
        }, 20);
      }
    }, true);

    shadow.addEventListener('dragover', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var dropzone = target.closest('#gc-dropzone');
      if (!dropzone) {
        return;
      }
      event.preventDefault();
      dropzone.classList.add('dragover');
    });

    shadow.addEventListener('dragleave', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var dropzone = target.closest('#gc-dropzone');
      if (!dropzone) {
        return;
      }
      if (!dropzone.contains(event.relatedTarget)) {
        dropzone.classList.remove('dragover');
      }
    });

    shadow.addEventListener('drop', function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      var dropzone = target.closest('#gc-dropzone');
      if (!dropzone) {
        return;
      }
      event.preventDefault();
      dropzone.classList.remove('dragover');
      if (event.dataTransfer && event.dataTransfer.files) {
        handleFileUpload(event.dataTransfer.files);
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        if (state.reportOpen) {
          closeReportOverlay();
          return;
        }
        if (state.profileMenuOpen) {
          state.profileMenuOpen = false;
          render();
          return;
        }
        if (state.open) {
          closePanel();
          return;
        }
        if (state.dashboardOpen) {
          closeDashboard();
          return;
        }
      }
      handleHotkey(event);
    });
  }

  function render() {
    var hasTopbarShortcuts = patchTopbar();
    patchWorkbenchScenario();
    patchFeasibilityActionButtons();
    patchXaiFeasibilityCopy();
    bindReportEntryButtons();
    overlay.classList.toggle('hidden', !state.open);
    dashboardOverlay.classList.toggle('hidden', !state.dashboardOpen);
    reportOverlay.classList.toggle('hidden', !state.reportOpen);
    if (hasTopbarShortcuts) {
      launchBtn.style.display = 'none';
      dashboardBtn.style.display = 'none';
    } else {
      launchBtn.style.display = state.open || state.dashboardOpen ? 'none' : 'inline-flex';
      dashboardBtn.style.display = state.dashboardOpen || state.open ? 'none' : 'inline-flex';
    }

    if (state.open) {
      content.innerHTML = renderStepper() + renderBody();
    }
    dashboardContent.innerHTML = renderDashboard();
    reportContent.innerHTML = renderDesignReport();
    toasts.innerHTML = renderToasts();
    renderProfileMenu();
  }

  var topbarObserver = new MutationObserver(function () {
    patchTopbar();
    patchWorkbenchScenario();
    patchFeasibilityActionButtons();
    patchXaiFeasibilityCopy();
    bindReportEntryButtons();
  });
  topbarObserver.observe(document.body, { childList: true, subtree: true });

  window.setInterval(function () {
    if (state.dashboardOpen && !state.open) {
      render();
    }
  }, 5000);

  bindEvents();
  render();
})();
