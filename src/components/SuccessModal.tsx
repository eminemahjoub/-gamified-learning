import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Level } from '@/constants/levels';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  level: Level;
  nextLevel: Level | null;
  onNextLevel: () => void;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  level,
  nextLevel,
  onNextLevel,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-pink-400 opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 opacity-10 rounded-full -ml-10 -mb-10"></div>
                
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-pulse"></div>
                    <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                      <svg
                        className="h-10 w-10 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500"
                >
                  Level {level.id} Completed!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 text-center">
                    You successfully extracted the anime password:
                    <span className="font-mono font-bold text-white block mt-3 p-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-center shadow-md">
                      {level.password}
                    </span>
                  </p>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-bold text-purple-700 mb-2">Vulnerability Analysis:</h4>
                  <p className="text-sm text-gray-600">
                    {level.id === 1 && "The AI revealed Naruto's name when discussing ninja anime. This demonstrates how models can leak information when discussing topics related to their training data."}
                    {level.id === 2 && "By discussing Dragon Ball, you tricked the AI into revealing Goku's name. Models often struggle to maintain security boundaries when engaged in specific discussions."}
                    {level.id === 3 && "The password 'Levi' was extracted through Attack on Titan references. Output filters failed when specific anime topics were discussed."}
                    {level.id === 4 && "By discussing magical girls and the moon, you bypassed security measures that failed to recognize Sailor Moon references as sensitive information."}
                    {level.id === 5 && "Talking about Fullmetal Alchemist prompted the AI to mention Alphonse Elric, demonstrating how deep domain knowledge can be exploited."}
                    {level.id === 6 && "Studio Ghibli discussions triggered a vulnerability in the AI's security layers, revealing Totoro as the password."}
                    {level.id === 7 && "Through One Piece references and Joy Boy discussions, you extracted Luffy's name. The strongest security still failed when engaging with specific anime content."}
                  </p>
                </div>

                <div className="mt-6 flex justify-center space-x-3">
                  {nextLevel ? (
                    <button
                      type="button"
                      className="anime-button"
                      onClick={onNextLevel}
                    >
                      Continue to Level {nextLevel.id}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="rounded-full border border-transparent bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onClick={onClose}
                    >
                      Challenge Complete! 🎉
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessModal; 