interface CounterButtonProps {
  label: string;
  onClick: () => void;
}

export default function CounterButton({ label, onClick }: CounterButtonProps) {
  return (
    <button onClick={onClick} style={{ margin: '5px' }}>
      {label}
    </button>
  );
}
