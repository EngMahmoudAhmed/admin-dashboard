import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
    const links = {
        Company: ["About", "Careers", "Blog"],
        Resources: ["Docs", "Support", "API Status"],
        Legal: ["Privacy Policy", "Terms of Service"],
    };

    return (
        <footer className="shadow-2xl shadow-gray-500 dark:shadow-slate-900 transition mx-10 my-10 bg-white dark:bg-slate-900 rounded-lg">
            <div className="max-w-7xl mx-auto px-6 py-14">
                {/* Top */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">MyApp</h2>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            Building modern web applications with React and Tailwind CSS.
                        </p>
                        <div className="social-icons flex gap-4 mt-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                            >
                                <Facebook size={24} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                            >
                                <Twitter size={24} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>

                    {/* Dynamic Links */}
                    {Object.entries(links).map(([title, items]) => (
                        <FooterColumn key={title} title={title} items={items} />
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-gray-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-600 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition">Privacy</span>
                        <span className="cursor-pointer hover:text-slate-900 dark:hover:text-white transition">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({ title, items }) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <ul className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                    <li key={item} className="cursor-pointer transition text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// function IconWrapper({ children }) {
//     return (
//         <div className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 cursor-pointer transition">
//             {children}
//         </div>
//     );
// }

export default Footer;