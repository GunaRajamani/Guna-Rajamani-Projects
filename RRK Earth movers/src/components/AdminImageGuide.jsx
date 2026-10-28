/**
 * AdminImageGuide — shown in empty gallery/project sections
 * to tell the client exactly where to go to add photos.
 */
export default function AdminImageGuide({ type = "gallery" }) {
  const steps = {
    gallery: {
      title: "No Gallery Photos Yet",
      steps: [
        "Open your browser and go to http://127.0.0.1:8000/admin/",
        "Log in with your admin username and password",
        'Click "Gallery Images" in the left sidebar',
        'Click "Add Gallery Image" in the top right',
        "Upload your machinery photo, set the category, and click Save",
        "The photo will appear here immediately",
      ],
    },
    projects: {
      title: "No Projects Added Yet",
      steps: [
        "Go to http://127.0.0.1:8000/admin/",
        'Click "Projects" in the sidebar',
        'Click "Add Project"',
        "Fill in the project name, location, category, and upload a photo",
        'Tick "Is Featured" to show it on the homepage',
        "Click Save — it appears here instantly",
      ],
    },
  };

  const guide = steps[type] || steps.gallery;

  return (
    <div className="col-span-full py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 rounded-xl bg-brand-yellow/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-lg text-brand-gray mb-2">{guide.title}</h3>
        <p className="text-sm text-gray-500 mb-6">Follow these steps to add photos via the admin panel:</p>
        <ol className="text-left space-y-2">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
