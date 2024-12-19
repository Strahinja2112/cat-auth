"use client";

import { motion } from "framer-motion";
import React from "react";

type Props = {};

export default function BackgroundEffect({}: Props) {
	if (typeof window !== "undefined")
		return (
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(75)].map((_, i) => (
					<motion.div
						key={i}
						initial={{
							opacity: 0,
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
						}}
						animate={{
							opacity: [0, 0.5, 0],
							scale: [1, 2, 1],
							transition: {
								duration: Math.random() * 5 + 3,
								repeat: Infinity,
								delay: Math.random() * 2,
							},
						}}
						className="absolute w-2 h-2 bg-indigo-200/70 dark:bg-indigo-600/40 rounded-full"
					/>
				))}
			</div>
		);
}
