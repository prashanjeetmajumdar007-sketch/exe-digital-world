import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Repeat, Heart, MessageCircle, Share2, Music, Sparkles } from 'lucide-react';

export default function PhoneMockup({ 
  videoUrl, 
  title = "Viral Reel Demo", 
  likes = "142K", 
  views = "1.2M",
  autoPlay = false
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(err => {
        console.warn("Video play error:", err);
      });
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleLoop = (e) => {
    e.stopPropagation();
    setIsLooping(!isLooping);
  };

  return (
    <div className="flex flex-col items-center group">
      
      {/* iPhone 13 Frame Container */}
      <div className="iphone-13-frame w-[270px] sm:w-[290px] bg-slate-950 border-4 border-slate-800 rounded-[44px] shadow-2xl relative select-none">
        
        {/* Top Notch & Camera */}
        <div className="iphone-notch">
          <div className="iphone-camera"></div>
          <div className="iphone-speaker"></div>
        </div>

        {/* Video Area (9:16 vertical ratio) */}
        <div className="relative w-full h-[520px] bg-black overflow-hidden flex items-center justify-center">
          
          {hasError ? (
            <div className="p-6 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-cyan-400 mx-auto opacity-60" />
              <p className="text-xs font-semibold">Demo Video Stream Ready</p>
              <p className="text-[10px] text-slate-500">{title}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-cover cursor-pointer"
              playsInline
              loop={isLooping}
              muted={isMuted}
              onClick={togglePlay}
              onError={() => setHasError(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          )}

          {/* Big Play/Pause Overlay Overlay when paused */}
          {!isPlaying && !hasError && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity group-hover:bg-black/30"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-glow-cyan transform group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-black ml-1" />
              </div>
            </div>
          )}

          {/* Top Header Badge inside Phone */}
          <div className="absolute top-8 left-0 right-0 px-4 flex items-center justify-between text-white text-[11px] font-semibold tracking-wide drop-shadow z-20 pointer-events-none">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              REELS DEMO
            </span>
            <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 font-mono text-[10px]">
              {views} VIEWS
            </span>
          </div>

          {/* Right Floating Social Action Overlay */}
          <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4 text-white z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
              className="flex flex-col items-center gap-1 group/btn"
            >
              <div className={`p-2.5 rounded-full backdrop-blur-md transition-all ${isLiked ? 'bg-red-500/30 text-red-500 scale-110' : 'bg-black/40 hover:bg-black/60 text-white'}`}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
              </div>
              <span className="text-[10px] font-bold drop-shadow">{isLiked ? 'Liked' : likes}</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold drop-shadow">4.9★</span>
            </button>

            <button onClick={toggleMute} className="flex flex-col items-center gap-1">
              <div className={`p-2.5 rounded-full backdrop-blur-md ${isMuted ? 'bg-red-500/80 text-white' : 'bg-cyan-500 text-black font-bold'}`}>
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </div>
              <span className="text-[9px] font-bold drop-shadow uppercase">{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <div className="w-7 h-7 rounded-full bg-slate-800 border-2 border-cyan-400 flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
              <Music className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

          {/* Bottom Caption & Account Overlay */}
          <div className="absolute bottom-4 left-3 right-16 text-left text-white z-20 pointer-events-none drop-shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-[1px]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center font-bold text-[9px]">
                  EXE
                </div>
              </div>
              <span className="text-xs font-bold tracking-tight">@exedigitalworld</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500 text-black font-extrabold">VERIFIED</span>
            </div>
            <p className="text-[11px] text-slate-100 font-medium line-clamp-2 leading-tight">
              {title}
            </p>
          </div>

        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-4 bg-black flex items-center justify-center">
          <div className="w-24 h-1 rounded-full bg-slate-700"></div>
        </div>

      </div>

      {/* Caption under Mockup */}
      <div className="mt-3 text-center">
        <h4 className="text-xs font-bold text-slate-200">{title}</h4>
        <p className="text-[11px] text-slate-400">9:16 Vertical HD • Unbranded</p>
      </div>

    </div>
  );
}
