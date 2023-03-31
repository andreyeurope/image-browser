import { Photo } from "@/types/search";
import Modal from "../common/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ImagePreviewModal(props: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  photo: Photo;
}) {
  const { isOpen, photo, setOpen } = props;
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
        <button
          type="button"
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-2 items-center mr-6">
          <div className="aspect-[16/9] 2 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
              className="object-cover object-center"
            />
          </div>
          <p>
            Name:{" "}
            <span className="text-gray-500">
              {photo.description || photo.alt_description}
            </span>
          </p>
          <p>
            Author: <span className="text-gray-500">{photo.user.name}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
}
