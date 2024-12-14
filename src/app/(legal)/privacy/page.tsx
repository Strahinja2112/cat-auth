import React from "react";

export default function PrivacyPolicy() {
	return (
		<div className="max-w-4xl mx-auto p-8 text-primary flex-1">
			<h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
			<p className="mb-4">
				Welcome to [ChatApp Name]. We are committed to protecting your privacy.
				This policy explains how we collect, use, and safeguard your
				information.
			</p>

			<h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
			<ul className="list-disc pl-6 mb-4">
				<li>Personal Data: Name, email, phone number, profile picture</li>
				<li>Messages and Content: Texts, images, files</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">
				How We Use Your Information
			</h2>
			<ul className="list-disc pl-6 mb-4">
				<li>To provide and improve our service</li>
				<li>To communicate with you</li>
				<li>To ensure security and prevent fraud</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Sharing Your Information</h2>
			<ul className="list-disc pl-6 mb-4">
				<li>Nobody</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Security</h2>
			<p className="mb-4">
				We use various security measures to protect your data, but cannot
				guarantee absolute security.
			</p>

			<h2 className="text-xl font-semibold mb-2">Your Rights</h2>
			<ul className="list-disc pl-6 mb-4">
				<li>Access, correct, or delete your data</li>
				<li>Restrict or object to processing</li>
				<li>Data portability</li>
			</ul>

			<h2 className="text-xl font-semibold mb-2">Changes</h2>
			<p className="mb-4">
				We may update this policy. Changes will be posted on this page.
			</p>

			<p>If you have any questions, please contact us.</p>
		</div>
	);
}
