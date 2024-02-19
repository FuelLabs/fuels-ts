import type { UIEventMessage, RequestMessage, ResponseMessage, EventMessage } from './events';

export interface MessageSender {
  id?: string | undefined;
  origin?: string | undefined;
  tab?: {
    id?: number | undefined;
    index?: number | undefined;
    windowId?: number | undefined;
    url?: string | undefined;
    title?: string | undefined;
    favIconUrl?: string | undefined;
  };
}

export type CommunicationMessage = UIEventMessage | RequestMessage | ResponseMessage | EventMessage;
