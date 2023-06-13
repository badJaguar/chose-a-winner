import Caption from "./caption";

interface ModalProps {
  title: string;
  body: React.ReactNode | undefined;
  open: boolean;
  onClose: VoidFunction;
}

export default function Modal(props: ModalProps) {
  const { title, open, body, onClose } = props;

  if (!open) return null;

  return (
    <div aria-hidden="true" className="fixed flex top-0 left-0 right-0 z-50 w-full p-4 overflow-hidden overflow-y-auto md:inset-0 h-full bg-black bg-opacity-60">
      <div className="relative rounded-lg w-full max-w-4xl h-full m-auto ring-4 ring-primary-500 overflow-hidden">
        <div className="relative bg-white rounded-lg shadow overflow-auto h-full">
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900">
              <Caption overflow="none" caption={title} />
            </h3>
            <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          {body}
        </div>
      </div>
    </div>
  );
}