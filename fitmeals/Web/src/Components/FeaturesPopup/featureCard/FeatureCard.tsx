import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface FeatureCardProps {
  imgUrl: string;
  navUrl: string;
  description: string;
  title: string;
  tags?: string[];
}

const FeatureCard = ({
  imgUrl,
  navUrl,
  description,
  title,
  tags = [],
}: FeatureCardProps) => {
  return (
    <div className="group flex flex-col h-full w-full bg-neutral-900 rounded-2xl border border-neutral-800 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">

      <div className="relative w-full h-[220px] bg-gradient-to-br from-emerald-500/10 via-neutral-800 to-neutral-950 overflow-hidden flex items-center justify-center p-6 border-b border-neutral-800">
        <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
        
        {imgUrl ? (
          <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
            <Image
              src={imgUrl}
              alt={title}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        ) : (
          <div className="w-full h-full border border-dashed border-neutral-700 rounded-xl flex items-center justify-center text-neutral-500 text-sm font-medium bg-neutral-900/50">
            Preview Layout
          </div>
        )}
      </div>


      <div className="flex flex-col flex-1 p-6 relative z-10">

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-neutral-800 text-emerald-400 rounded-md border border-emerald-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          {title}
        </h3>
        
        <p className="text-sm text-neutral-400 leading-relaxed mb-6">
          {description}
        </p>


        <Link 
          href={navUrl || "#"}
          className="mt-auto w-full inline-flex justify-center items-center gap-2 bg-neutral-800 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
        >
          Explore Feature
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
