import { useState } from 'react';

export const useToggle = ({ onOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggler = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    if (nextIsOpen) {
      onOpen();
    } else {
      onClose();
    }
  };

  return [isOpen, toggler];
};

function Example() {
  const onOpen = () => {
    alert('Open sesame!');
  };
  const onClose = () => {
    alert('Close sesame!');
  };
  const [isOpen, toggle] = useToggle({ onOpen, onClose });

  return (
    <>
      <button onClick={toggle}></button>
      {isOpen && <div>The div is now Open.</div>}
    </>
  );
}
