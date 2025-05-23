import { motion } from "framer-motion";
import { ChevronLeft, Heart } from "lucide-react";

const successStories = [
  {
    id: 1,
    names: "Sarah & Michael",
    story: "We met on miamour and instantly connected over our shared love for travel and adventure. After 6 months of dating, we're now planning our wedding!",
    image: "/assets/test.png",
    date: "Married 2023"
  },
  {
    id: 2,
    names: "Emma & James",
    story: "Thanks to miamour's smart matching algorithm, we found each other despite living in different cities. Now we're happily married with two beautiful children.",
    image: "/assets/test2.png",
    date: "Married 2022"
  },
  {
    id: 3,
    names: "David & Lisa",
    story: "We were both skeptical about online dating, but miamour's verification process made us feel safe. Now we're celebrating our first anniversary!",
    image: "/assets/test3.png",
    date: "Married 2023"
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
  
      <div className="flex-grow flex flex-col">
      
        <main className="flex-grow overflow-y-auto px-4 py-6 lg:px-6 lg:py-8">
          <div className="container mx-auto px-4 py-6">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-[#FF1493] mb-6 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-[#FF1493] mb-4"
              >
                Success Stories
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                Real stories from couples who found love through miamour
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg border-2 border-[#FF1493]/20 overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={story.image}
                      alt={story.names}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{story.names}</h3>
                      <p className="text-sm opacity-90">{story.date}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{story.story}</p>
                    <div className="flex items-center text-[#FF1493]">
                      <Heart className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">Success Story</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(255,20,147,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#FF1493] text-white px-8 py-3 rounded-lg font-medium"
              >
                Share Your Story
              </motion.button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}