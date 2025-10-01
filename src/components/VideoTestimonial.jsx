import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, Settings, X, Star, Quote } from 'lucide-react';

const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    title: "Swan Clothing Brand Transformation",
    client: "Sarah Johnson",
    role: "Founder, Swan Clothing",
    company: "Swan Clothing",
    industry: "Fashion",
    duration: "2:30",
    thumbnail: '/img/swan-clothing.webp',
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", // Replace with actual video
    quote: "Bereket transformed our vision into a stunning reality. The brand identity perfectly captures our essence and has been instrumental in our success.",
    rating: 5,
    project: "Complete Brand Identity Design",
    results: [
      "40% increase in brand recognition",
      "60% boost in social media engagement",
      "95% customer satisfaction rate"
    ],
    testimonial: "Working with Bereket was an absolute game-changer for our business. His attention to detail and creative vision helped us stand out in a crowded market. The brand identity he created not only looks amazing but also resonates perfectly with our target audience."
  },
  {
    id: 2,
    title: "Finix Financial Web Assets",
    client: "Michael Chen",
    role: "Marketing Director",
    company: "Finix Financial",
    industry: "Fintech",
    duration: "1:45",
    thumbnail: '/img/Finix.webp',
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4", // Replace with actual video
    quote: "The web assets have revolutionized our digital presence. Our marketing team can now create stunning content in minutes instead of hours.",
    rating: 5,
    project: "Web Asset Collection",
    results: [
      "35% increase in engagement rates",
      "50% boost in email open rates",
      "25% improvement in brand trust"
    ],
    testimonial: "Bereket's expertise in fintech design is unmatched. He understood our complex requirements and delivered assets that not only look professional but also drive real business results. The ROI on this project has been incredible."
  },
  {
    id: 3,
    title: "YAT Construction Rebranding",
    client: "David Rodriguez",
    role: "CEO",
    company: "YAT Construction PLC",
    industry: "Construction",
    duration: "2:15",
    thumbnail: '/img/YAT-Construction-PLC.webp',
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4", // Replace with actual video
    quote: "The complete rebranding elevated our company from traditional construction firm to modern industry leader. Professional and impactful.",
    rating: 5,
    project: "Complete Company Rebranding",
    results: [
      "50% increase in new client inquiries",
      "30% boost in brand recognition",
      "Complete corporate identity overhaul"
    ],
    testimonial: "Bereket took our traditional construction company and gave it a modern, professional identity that appeals to both corporate clients and local communities. The transformation has been remarkable and has directly contributed to our business growth."
  }
];

const VideoPlayer = ({ video, isOpen, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
    }
  }, [isOpen, video]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-primary rounded-2xl border border-accent/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-accent/20">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-light mb-2">{video.title}</h2>
                <div className="flex items-center gap-4 text-accent/80">
                  <span>{video.client}</span>
                  <span>•</span>
                  <span>{video.role}</span>
                  <span>•</span>
                  <span>{video.company}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-accent" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className="w-full aspect-video"
              poster={video.thumbnail}
              onMouseMove={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                >
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div
                      className="w-full h-1 bg-accent/30 rounded-full cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-200"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white" />
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-accent/30 rounded-full appearance-none cursor-pointer"
                      />

                      <span className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={playbackRate}
                        onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                        className="bg-primary/80 text-white text-sm rounded px-2 py-1 border border-accent/30"
                      >
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                      </select>

                      <button
                        onClick={toggleFullscreen}
                        className="p-2 hover:bg-accent/20 rounded-full transition-colors"
                      >
                        {isFullscreen ? (
                          <Minimize className="w-5 h-5 text-white" />
                        ) : (
                          <Maximize className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Details */}
          <div className="p-6 space-y-6">
            {/* Quote */}
            <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-6 border border-accent/20">
              <Quote className="w-8 h-8 text-accent mb-4" />
              <blockquote className="text-lg text-light italic mb-4">
                "{video.quote}"
              </blockquote>
              <div className="flex items-center gap-2">
                {[...Array(video.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-light mb-3">Project Details</h3>
                <div className="space-y-2 text-accent/80">
                  <p><span className="font-medium">Project:</span> {video.project}</p>
                  <p><span className="font-medium">Industry:</span> {video.industry}</p>
                  <p><span className="font-medium">Duration:</span> {video.duration}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-light mb-3">Key Results</h3>
                <ul className="space-y-1 text-accent/80">
                  {video.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Testimonial */}
            <div>
              <h3 className="text-lg font-semibold text-light mb-3">Full Testimonial</h3>
              <p className="text-accent/80 leading-relaxed">{video.testimonial}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const VideoTestimonial = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const openVideo = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
    
    // Track video testimonial view
    if (window.gtag) {
      window.gtag('event', 'view_video_testimonial', {
        event_category: 'testimonials',
        event_label: video.title
      });
    }
  };

  const closeVideo = () => {
    setIsPlayerOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section id="video-testimonials" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            Video Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-6">
            Client Success
            <span className="text-accent block">Stories</span>
          </h2>
          <p className="text-xl text-accent/80 max-w-3xl mx-auto leading-relaxed">
            Hear directly from clients about their experience working with me and the results we achieved together.
          </p>
        </motion.div>

        {/* Video Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEO_TESTIMONIALS.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openVideo(video)}
            >
              <Card className="h-full bg-primary/50 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 rounded-t-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      className="w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </motion.div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                    {video.duration}
                  </div>

                  {/* Industry Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent/90 text-primary">
                      {video.industry}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-light group-hover:text-accent transition-colors line-clamp-2">
                    {video.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2 text-sm text-accent/70">
                    <span>{video.client}</span>
                    <span>•</span>
                    <span>{video.role}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-accent/80 leading-relaxed mb-4 line-clamp-3">
                    "{video.quote}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(video.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-accent/30 text-accent hover:bg-accent hover:text-primary"
                    >
                      Watch Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl p-8 border border-accent/20">
            <h3 className="text-2xl font-bold text-light mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-accent/80 mb-6 max-w-2xl mx-auto">
              Join these satisfied clients and transform your brand with professional design services that deliver real results.
            </p>
            <Button className="bg-accent text-primary hover:bg-accent/90 font-semibold px-8 py-3">
              Start Your Project
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayer 
        video={selectedVideo} 
        isOpen={isPlayerOpen} 
        onClose={closeVideo} 
      />
    </section>
  );
};

export default VideoTestimonial;
