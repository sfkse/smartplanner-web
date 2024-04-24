export type ModalProps = {
  title: string;
  description?: string;
  content: ModalContent[];
};

export type ModalContent = {
  modalType?: string;
  label: string;
  name: string;
  type: string;
  value?: string;
  dataSource?: string[];
  fields?: { text: string; value: string };
  description?: string;
  handleOnChange?: (e: any) => void;
};

