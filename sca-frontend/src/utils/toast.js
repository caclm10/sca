import hotToast from "react-hot-toast";
import { HiExclamationCircle, HiX, HiCheck } from 'react-icons/hi'

const toast = {
    show: (type, message) => {
        hotToast.custom((t) => (
            <div
                className={`${t.visible ? 'animate-toast-enter' : 'animate-toast-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 pt-0.5">
                            {type === 'error' && <HiExclamationCircle className="text-red-500 h-6 w-6" />}
                            {type === 'success' && <HiCheck className="text-green-500 h-6 w-6" />}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 capitalize">
                                {type}
                            </p>
                            {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
                        </div>
                    </div>
                </div>
                <div className="flex border-gray-200 p-4">
                    <button
                        onClick={() => hotToast.dismiss(t.id)}
                    >
                        <HiX className="w-5 h-5" />
                    </button>
                </div>
            </div>
        ))
    }
}

export default toast