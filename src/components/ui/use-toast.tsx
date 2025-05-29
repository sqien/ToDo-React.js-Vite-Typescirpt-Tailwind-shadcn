import { toast as sonnerToast } from 'sonner';

export function useToast() {
  return {
    toast: (props: {
      title: string;
      description: string;
      variant: 'default' | 'destructive';
    }) => {
      sonnerToast(
        <div className="space-y-1">
          <p className="font-semibold">{props.title}</p>
          {props.description && (
            <p className="text-sm text-muted-foreground ">
              {props.description}
            </p>
          )}
        </div>,
        {}
      );
    },
  };
}
