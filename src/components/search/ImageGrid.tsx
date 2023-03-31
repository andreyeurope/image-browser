import { Photo } from "@/types/search";

export default function ImageGrid(props: {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}) {
  const { photos, onPhotoClick } = props;
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-8 xl:gap-x-8 m-4"
    >
      {photos.map((photo) => (
        <ImageGridItem
          key={photo.id}
          photo={photo}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </ul>
  );
}

const ImageGridItem = (props: {
  photo: Photo;
  onPhotoClick: (photo: Photo) => void;
}) => {
  const { photo, onPhotoClick } = props;
  return (
    <li
      key={photo.id}
      className="relative hover:bg-slate-100 rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
      title={photo.description || photo.alt_description}
    >
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 ">
        <img
          src={photo.urls.small}
          alt={photo.alt_description || photo.description}
          className="pointer-events-none object-cover group-hover:opacity-75"
        />
      </div>
      <p className="pointer-events-none mt-2 ml-1 block truncate text-sm font-medium text-slate-700">
        {photo.description || photo.alt_description}
      </p>
      <button
        type="button"
        className="absolute inset-0 focus:outline-none"
        onClick={() => onPhotoClick(photo)}
      ></button>
    </li>
  );
};
