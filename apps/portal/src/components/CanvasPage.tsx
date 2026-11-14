import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  Download, 
  PenTool, 
  Image as ImageIcon, 
  Film, 
  BookOpen,
  Edit3,
  Video
} from 'lucide-react';
import { MindulleSeal } from './MindulleSeal';

type StudioTool = 'draw' | 'vector' | 'photo' | 'effect' | 'design' | 'video';

interface ToolConfig {
  id: StudioTool;
  name: string;
  category: string;
  adobeEquivalent: string;
  version: string;
  cliBin: string;
  webUrl: string;
  description: string;
  sampleFile?: {
    name: string;
    path: string;
  };
}

const TOOLS: Record<StudioTool, ToolConfig> = {
  draw: {
    id: 'draw',
    name: 'Sonagi Draw',
    category: 'Infinite Whiteboard & Wireframing',
    adobeEquivalent: 'FigJam / Miro',
    version: 'v1.0.0',
    cliBin: 'sonagi-draw',
    webUrl: 'https://draw.sonagi.space/',
    description: '실시간 무한 캔버스, Tldraw 기반 UI 와이어프레임 컴포넌트, Jambot형 AI 아이디에이션 및 Local API 브릿지 지원'
  },
  vector: {
    id: 'vector',
    name: 'VectorCraft',
    category: '2D Vector Studio',
    adobeEquivalent: 'Illustrator',
    version: 'v0.11.0',
    cliBin: 'vectorcraft-cli',
    webUrl: 'https://draw.sonagi.space/vector/',
    description: '베지에 패스, 펜 툴, 패스파인더, 무손실 SVG/PDF 및 .vectorcraft JSON AST 지원',
    sampleFile: {
      name: 'mindulle-studio-seal.vectorcraft',
      path: '/brand/mindulle-studio-seal.vectorcraft'
    }
  },
  photo: {
    id: 'photo',
    name: 'PhotoCraft',
    category: 'Raster Image Studio',
    adobeEquivalent: 'Photoshop',
    version: 'v0.9.0',
    cliBin: 'photocraft-cli',
    webUrl: 'https://draw.sonagi.space/photo/',
    description: '레이어 마스크, 색조 보정, 실제 .psd 파일 호환 및 고속 WebGPU 래스터 엔진'
  },
  effect: {
    id: 'effect',
    name: 'EffectCraft',
    category: 'Motion & Visual Effects',
    adobeEquivalent: 'After Effects',
    version: 'v0.10.0',
    cliBin: 'effectcraft-cli',
    webUrl: 'https://draw.sonagi.space/effect/',
    description: '키프레임 타임라인, 306개 라이브 이펙트, 웹용 Lottie JSON 및 헤드리스 MP4 렌더링'
  },
  design: {
    id: 'design',
    name: 'DesignCraft',
    category: 'Page Layout & Publishing',
    adobeEquivalent: 'InDesign',
    version: 'v0.8.0',
    cliBin: 'designcraft-cli',
    webUrl: 'https://draw.sonagi.space/publish/',
    description: '다단 그리드 조판, 마스터 페이지, 단락 스타일 및 인쇄 규격 고해상도 PDF 출판'
  },
  video: {
    id: 'video',
    name: 'FilmCraft',
    category: 'Non-Linear Video Editing',
    adobeEquivalent: 'Premiere Pro',
    version: 'v0.17.0',
    cliBin: 'filmcraft-cli',
    webUrl: 'https://draw.sonagi.space/video/',
    description: '멀티트랙 비디오/오디오 타임라인, 정밀 컷편집, 실시간 트랜스코딩 및 헤드리스 렌더링'
  }
};

export const CanvasPage: React.FC<{ initialTool?: StudioTool }> = ({ initialTool = 'draw' }) => {
  const [activeTool, setActiveTool] = useState<StudioTool>(initialTool);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const current = TOOLS[activeTool];

  return (
    <div className="h-screen w-full flex flex-col bg-[#060911] text-gray-100 overflow-hidden font-sans">
      {/* 01. Top Suite Header Navigation */}
      <header className="h-16 px-4 md:px-6 bg-[#090d16] border-b-2 border-mds-border flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-mds-muted hover:text-white border border-mds-border hover:border-gray-500 rounded-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portal</span>
          </Link>

          <MindulleSeal size={22} showText={false} className="hidden sm:block" />

          <div className="h-5 w-px bg-mds-border hidden sm:block" />

          {/* App Switcher Tabs */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-sm border border-mds-border/60">
            <button
              onClick={() => setActiveTool('draw')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'draw'
                  ? 'bg-cyan-400 text-black shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Draw</span>
            </button>

            <button
              onClick={() => setActiveTool('vector')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'vector'
                  ? 'bg-mds-dandelion text-black shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Vector</span>
            </button>

            <button
              onClick={() => setActiveTool('photo')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'photo'
                  ? 'bg-mds-rain text-black shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photo</span>
            </button>

            <button
              onClick={() => setActiveTool('effect')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'effect'
                  ? 'bg-purple-400 text-black shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Motion</span>
            </button>

            <button
              onClick={() => setActiveTool('design')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'design'
                  ? 'bg-emerald-400 text-black shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>

            <button
              onClick={() => setActiveTool('video')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-sm transition-all ${
                activeTool === 'video'
                  ? 'bg-sky-400 text-black shadow-sm font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video</span>
            </button>
          </div>

          <span className="hidden xl:inline-block text-[11px] font-mono text-mds-muted">
            • {current.category} ({current.version})
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {current.sampleFile && (
            <a
              href={current.sampleFile.path}
              download={current.sampleFile.name}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-mds-dandelion border border-mds-dandelion/50 hover:bg-mds-dandelion/10 rounded-sm transition-colors"
              title="Download Sample Vector AST"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Sample AST</span>
            </a>
          )}

          <a
            href={current.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-gray-300 hover:text-white border border-mds-border hover:border-gray-500 rounded-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-mds-rain border border-mds-rain/50 hover:bg-mds-rain/10 rounded-sm transition-colors"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 02. Main Workspace: Live Embedded WASM Canvas for All 4 Tools */}
      <main className={`flex-1 w-full relative bg-[#080b13] ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/80 hover:bg-black text-white border border-white/20 rounded-lg shadow-xl"
            title="Exit Fullscreen"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        )}

        <iframe
          key={current.id}
          src={current.webUrl}
          className="absolute inset-0 w-full h-full border-0"
          title={`${current.name} Canvas`}
          allow="fullscreen; clipboard-read; clipboard-write; webgpu"
          allowFullScreen
        />
      </main>
    </div>
  );
};
