import React from 'react';
import PhoneMockup from '../common/PhoneMockup';
import { Play, Sparkles, Smartphone, CheckCircle } from 'lucide-react';

export default function DemoReelsSection({ demoVideos = [] }) {
  // Ensure we display at least 4 demo reels fallback if array is smaller
  const defaultDemos = [
    { title: 'Cyberpunk Futuristic Tech Reel', url: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-shot-of-a-futuristic-city-at-night-42299-large.mp4', views: '1.2M', likes: '142K' },
    { title: 'Digital Creator Smartphone Mockup', url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-43289-large.mp4', views: '890K', likes: '94K' },
    { title: 'High-Energy Fitness & Gym Reel', url: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-doing-exercises-with-dumbbells-41617-large.mp4', views: '2.4M', likes: '280K' },
    { title: 'Sunset Aesthetic Motivation Reel', url: 'https://assets.mixkit.co/videos/preview/mixkit-man-runs-along-the-sea-at-sunset-40131-large.mp4', views: '1.8M', likes: '195K' }
  ];

  const videoList = (demoVideos && demoVideos.length > 0) ? demoVideos : defaultDemos;
  // Make sure we have 4 items
  while (videoList.length < 4) {
    videoList.push(defaultDemos[videoList.length % defaultDemos.length]);
  }

  return (
    <section className="py-16 bg-gradient-to-b from-[#05070D] via-[#090E1A] to-[#05070D] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            ACTUAL 9:16 HD REEL PREVIEWS
          </div>
          
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            See What's Inside: <span className="gradient-text-cyan">Live Video Demo</span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400">
            Tap play on any phone below to sample actual high-converting Reel video clips included in this bundle. Non-watermarked 4K vertical footage.
          </p>
        </div>

        {/* 4 Phone Mockups Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-center">
          {videoList.slice(0, 4).map((vid, idx) => (
            <div key={vid.id || idx} className="flex justify-center">
              <PhoneMockup
                videoUrl={vid.url}
                title={vid.title || `Demo Reel #${idx + 1}`}
                likes={vid.likes || '120K'}
                views={vid.views || '900K'}
                autoPlay={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Feature Highlights under Demos */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-cyan-500/20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Clean & Non-Watermarked
            </h4>
            <p className="text-xs text-slate-400">Ready to post or edit in CapCut & Canva</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Ultra 4K/HD 60FPS
            </h4>
            <p className="text-xs text-slate-400">Optimized for Instagram & Meta Ads algorithms</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Full Commercial Rights
            </h4>
            <p className="text-xs text-slate-400">Use for client accounts and paid ad campaigns</p>
          </div>
        </div>

      </div>
    </section>
  );
}
