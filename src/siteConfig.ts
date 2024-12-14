const timeAsDeveloper = new Date().getFullYear() - 2020;

export const siteConfig = {
	name: "Cat Auth",
	url: "https://chat-flow-super.app",
	description:
		"I'm a full stack software engineer with a love for building innovative and user-friendly applications. In my free time, I enjoy tinkering with new technologies.",
	timeAsDeveloper,
	profileImage: "/patrik.jpg",
	portfolioLink: "https://strahinja.vercel.app/project/chatflow",
	author: {
		name: "Strahinja Pavićević",
		email: "pavicevicstrahinja99@gmail.com",
		bio: `Over the past ${timeAsDeveloper} years, I've seen the world of digital design and development change in incredible ways, and I've grown and adapted right along with it.`,
	},
	links: {
		oldPortfolio: "https://portfolio-strahinja.vercel.app",
		github: "https://github.com/Strahinja2112",
		linkedin: "https://www.linkedin.com/in/strahinja-pavićević-aa01702a6/",
	},
	nav: {
		projects: {
			all: () => "/projects/",
			tag: (tag: string) => `/projects/${tag}`,
			id: (id: string) => `/project/${id}`,
		},
		blogs: {
			all: () => "/projects/",
			tag: (tag: string) => `/blog/tag/${tag}`,
			id: (id: string) => `/blog/post/${id}`,
			edit: (id: string) => `/blog/edit/${id}`,
		},
	},
};
