import { siteConfig } from "@/siteConfig";
import React from "react";

const TermsOfService = () => {
	return (
		<div className="max-w-4xl mx-auto p-8 text-primary">
			<h1 className="text-2xl font-bold mb-4">Terms of Service</h1>

			<h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
			<p className="mb-4">
				By using {siteConfig.name}, you agree to these terms. If you do not
				agree, please do not use our service.
			</p>

			<h2 className="text-xl font-semibold mb-2">Use of the Service</h2>
			<p className="mb-4">
				You are responsible for your use of the service, including any content
				you create, share, or store. Do not use the service for illegal or
				harmful activities.
			</p>

			<h2 className="text-xl font-semibold mb-2">Account Security</h2>
			<p className="mb-4">
				Keep your account secure. You are responsible for safeguarding your
				password and any actions taken under your account.
			</p>

			<h2 className="text-xl font-semibold mb-2">Content Ownership</h2>
			<p className="mb-4">
				You retain ownership of any content you create. By using our service,
				you grant us a license to use, distribute, and display your content as
				necessary to operate the service.
			</p>

			<h2 className="text-xl font-semibold mb-2">Termination</h2>
			<p className="mb-4">
				We may suspend or terminate your access to the service at any time,
				without notice or liability, for any reason, including if you breach
				these terms.
			</p>

			<h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
			<p className="mb-4">
				Our service is provided &quot;as is&quot; without warranties of any
				kind. We are not liable for any damages arising from your use of the
				service.
			</p>

			<h2 className="text-xl font-semibold mb-2">Changes to Terms</h2>
			<p className="mb-4">
				We may update these terms from time to time. We will notify you of any
				changes by posting the new terms on this page.
			</p>

			<p>If you have any questions, please contact us.</p>
		</div>
	);
};

export default TermsOfService;
