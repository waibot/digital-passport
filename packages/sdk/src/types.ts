declare global {
  interface Window {
    electron?: ElectronApi;
    $?: any;
    WORKER_ACCOUNT?: any;
    TestCase?: any;
  }
}

export enum ElectronEvent {
  FULLSCREEN_CHANGE = 'fullscreen-change',
  UPDATE_ERROR = 'update-error',
  UPDATE_DOWNLOADED = 'update-downloaded',
}

export enum ElectronAction {
  GET_IS_FULLSCREEN = 'get-is-fullscreen',
  INSTALL_UPDATE = 'install-update',
  HANDLE_DOUBLE_CLICK = 'handle-double-click',
  OPEN_NEW_WINDOW = 'open-new-window',
}

export interface ElectronApi {
  invokeRenderBridgeAction: (
    botId: string,
    action: RenderActions,
    payload: any,
  ) => Promise<any | undefined>;
  invokeWorkerWindowAction: (
    botId: string,
    action: WorkerEventActions,
    payload: any,
  ) => Promise<any>;
  invokeMasterWindowAction: (
    botId: string,
    action: MasterEventActions,
    payload: any,
  ) => Promise<any>;
  invokeWorkerWindowKeyboardEventAction: (
    botId: string,
    type: string,
    keyCode: string,
    modifiers?: string[],
  ) => Promise<any>;
  invokeWorkerWindowMouseEventAction: (
    botId: string,
    paylaod: any,
  ) => Promise<any>;
  isFullscreen: () => Promise<boolean>;
  installUpdate: () => Promise<void>;
  handleDoubleClick: () => Promise<void>;
  openNewWindow: (url: string) => Promise<void>;

  on: (
    eventName: ElectronEvent | WorkerEvents | MasterEvents,
    callback: any,
  ) => VoidFunction;
}

export abstract class BaseConnection {
  abstract send(message: Buffer): void;

  abstract close(): void;
}

export type SendMessageRequest = {
  chatId: string;
  localMsgId: number;
  text: string;
  entities?: any[];
  taskId?: number;
};

export type SendBotCommandRequest = {
  chatId: string;
  localMsgId: number;
  command: string;
};

export type ApiChatMsg = {
  chatId: string;
  msgId: number;
  text?: string;
  isOutgoing?: boolean;
  senderId?: string;
  msgDate?: number;
  inlineButtons?: object[][];
  entities?: object[];
  content?: object;
};

export type SendMessageAck = {
  localMsgId: number;
  chatId: string;
  msgId: string;
};

export type SendMessageResponse = {
  ack: SendMessageAck;
  newMessage?: ApiChatMsg;
};

export type MessageUpdate = {
  msgId: number;
  chatId: string;
  senderId: string;
  text: string;
};

export type AuthSessionType = {
  authUserId: string;
  ts: number;
  address: string;
  clientId: number;
  chatId?: string;
};

export interface AccountUser {
  connection: BaseConnection;
  session?: AuthSessionType;
  token?: string;
  id: string;
}

export type LocalWorkerGroupType = {
  chatInfo: any;
  chatInfoFull: any;
};

export type LocalWorkerType =
  | 'chatGpt'
  | 'taskWorker'
  | 'custom'
  | 'coding'
  | 'sql'
  | 'bot';

export type LocalWorkerBotType = 'telegramBot' | 'chatGptBot';
export const LocalWorkerBotTypes = [
  'telegramBot',
  'chatGptBot',
] as LocalWorkerBotType[];

export type ChatGptModelType = 'gpt-4' | 'gpt-3.5-turbo';
export const ChatGptModelTypes = [
  'gpt-4',
  'gpt-3.5-turbo',
] as ChatGptModelType[];

export type LocalWorkerAccountType = {
  botId: string;
  username: string;
  bio: string;
  type: LocalWorkerType;
  name: string;
  appWidth: number;
  appHeight: number;
  appPosX: number;
  appPosY: number;
  proxy?: string;
  activeWindowOnOpenChat?: boolean;
  chatGptAuth?: string;
  chatGptModel?: string;
  browserUserAgent?: string;
  chatGptRole?: string;
  promptFormat?: string;
  replyParser?: string;
  taskWorkerUri?: string;
  customWorkerUrl?: string;
  avatarHash?: string;
  pluginJs?: string;
  mysqlMsgStorageDsn?: string;
  projectRootDir?: string;
  botType?: LocalWorkerBotType;
  telegramBotToken?: string;
  telegramBotNotifyChatId?: string;
  openAiApiKey?: string;
};

export type UserInfoType = {
  bio: string;
  userId: string;
  firstName: string;
  username?: string;
};

export enum WorkerEvents {
  Worker_Chat_Msg = 'Worker_Chat_Msg',
}

export enum WorkerEventActions {
  Worker_TaskAiMsg = 'Worker_TaskAiMsg',
  Worker_ChatMsg = 'Worker_ChatMsg',
  Worker_LoadUrl = 'Worker_LoadUrl',
  Worker_Reload = 'Worker_Reload',
  Worker_ShowDevTools = 'Worker_ShowDevTools',
  Worker_GoBack = 'Worker_GoBack',
  Worker_ActiveWindow = 'Worker_ActiveWindow',
  Worker_OnOpenChat = 'Worker_OnOpenChat',

  Worker_GetWorkerStatus = 'Worker_GetWorkerStatus',
  Worker_UpdateWorkerAccount = 'Worker_UpdateWorkerAccount',
  Worker_NotifyWorkerStatus = 'Worker_NotifyWorkerStatus',
  Worker_CallBackButton = 'Worker_CallBackButton',
}

export enum MasterEvents {
  Master_Chat_Msg = 'Master_Chat_Msg',
}

export enum MasterEventActions {
  GetFileData = 'GetFileData',
  SaveFileData = 'SaveFileData',
  CreateWorker = 'CreateWorker',
  CreateChatGptBot = 'CreateChatGptBot',
  NewMessage = 'NewMessage',
  NewContentMessage = 'NewContentMessage',
  NewMessageByTaskWorker = 'NewMessageByTaskWorker',
  UpdateMessage = 'UpdateMessage',
  FinishChatGptReply = 'FinishChatGptReply',
  DeleteMessages = 'DeleteMessages',
  DebugLogMessage = 'DebugLogMessage',
  UpdateWorkerStatus = 'UpdateWorkerStatus',
  GetWorkersStatus = 'GetWorkersStatus',
  RestartWorkerWindow = 'RestartWorkerWindow',
  RequestOpenAi = 'RequestOpenAi',
  CloseWorkerWindow = 'CloseWorkerWindow',
  ApplyMsgId = 'ApplyMsgId',
  UpdateUserInfo = 'UpdateUserInfo',

  DeleteWorkerBot = 'DeleteWorkerBot',

  GetWorkerAccount = 'GetWorkerAccount',
  UpdateWorkerAccount = 'UpdateWorkerAccount',
  GetWorkerAccounts = 'GetWorkerAccounts',
  GetWorkerAccountIds = 'GetWorkerAccountIds',

  GetWorkerGroup = 'GetWorkerGroup',
  UpdateWorkerGroup = 'UpdateWorkerGroup',
  GetWorkerGroups = 'GetWorkerGroups',
  GetWorkerGroupIds = 'GetWorkerGroupIds',

  GetKvCache = 'GetKvCache',
  PutKvCache = 'PutKvCache',
  DeleteKvCache = 'DeleteKvCache',
  GetChatMsg = 'GetChatMsg',

  GenUserId = 'GenUserId',
  GenChatMsgId = 'GenChatMsgId',
}

export enum ServerEventActions {
  Local_CreateChatGptBot = 'Local_CreateChatGptBot',
}

export enum RenderActions {
  InitWaiApp = 'InitWaiApp',
  UpdateWorkerStatus = 'UpdateWorkerStatus',
  AnswerCallbackButton = 'answerCallbackButton',
  SendMessage = 'sendMessage',
  UpdateMessage = 'updateMessage',
  SendBotCommand = 'sendBotCommand',
  DeleteMessages = 'deleteMessages',
  EnableMultipleQuestion = 'enableMultipleQuestion',
  SendMultipleQuestion = 'SendMultipleQuestion',
  LoadBotCommands = 'loadBotCommands',
  GetWorkerAccount = 'getWorkerAccount',
  DeleteChat = 'DeleteChat',
  DeleteChannel = 'DeleteChannel',
  GetWorkerStatus = 'getWorkerStatus',

  ApplyMsgId = 'applyMsgId',
  GetAiAskTask = 'GetAiAskTask',
  ReportAiAskTask = 'ReportAiAskTask',
  ServerLoop = 'ServerLoop',
  GetMsgInfo = 'GetMsgInfo',
}

export enum WindowActions {
  WorkerWindowAction = 'WorkerWindowAction',
  MasterWindowAction = 'MasterWindowAction',
  WorkerWindowKeyboardAction = 'WorkerWindowKeyboardAction',
  WorkerWindowMouseAction = 'WorkerWindowMouseAction',
  MasterWindowCallbackAction = 'MasterWindowCallbackAction',
  WorkerWindowCallbackAction = 'WorkerWindowCallbackAction',
}

export enum CallbackButtonAction {
  Master_createTaskWorker = 'Master_createTaskWorker',
  Master_createCustomWorker = 'Master_createCustomWorker',
  Master_createCommonBot = 'Master_createCommonBot',
  Master_createCodingWorker = 'Master_createCodingWorker',
  Master_createChatGptBotWorker = 'Master_createChatGptBotWorker',
  Master_OpenWorkerWindow = 'Master_OpenWorkerWindow',
  Master_restartWorker = 'Master_restartWorker',
  Master_openUserAppDataDir = 'Master_openUserAppDataDir',
  Master_openPluginDir = 'Master_openPluginDir',
  Master_closeAllWindow = 'Master_closeAllWindow',
  Master_closeWorkerWindow = 'Master_closeWorkerWindow',
  Master_appInfo = 'Master_appInfo',
  Master_openMessageDoc = 'Master_openMessageDoc',

  Local_setupProxy = 'Local_setupProxy',
  Local_setupChatGptAuth = 'Local_setupChatGptAuth',
  Local_setupWorkerName = 'Local_setupWorkerName',
  Local_setupWorkerUserName = 'Local_setupWorkerUserName',
  Local_setupWorkerBotType = 'Local_setupWorkerBotType',
  Local_setupWorkerBio = 'Local_setupWorkerBio',
  Local_setupBrowserUserAgent = 'Local_setupBrowserUserAgent',
  Local_setupTelegramBotToken = 'Local_setupTelegramBotToken',
  Local_setupOpenAiApiKey = 'Local_setupOpenAiApiKey',
  Local_setupChatGptModel = 'Local_setupChatGptModel',
  Local_setupTelegramBotNotifyChatId = 'Local_setupTelegramBotNotifyChatId',
  Local_setupWidthHeight = 'Local_setupWidthHeight',
  Local_setupTaskUri = 'Local_setupTaskUri',
  Local_setupHomeUrl = 'Local_setupHomeUrl',
  Local_setupPluginJs = 'Local_setupPluginJs',
  Local_setupProjectRootDir = 'Local_setupProjectRootDir',
  Local_mysqlMsgStorage = 'Local_mysqlMsgStorage',
  Local_clearHistory = 'Local_clearHistory',
  Local_cancelMessage = 'Local_cancelMessage',
  Local_setupPromptFormat = 'Local_setupPromptFormat',
  Local_setupReplyParser = 'Local_setupReplyParser',
  Local_resend = 'Local_resend',
  Local_deleteBot = 'Local_deleteBot',
  Local_copyBot = 'Local_copyBot',
  Local_createGroup = 'Local_createGroup',

  Local_cancelInlineButtons = 'Local_cancelInlineButtons',

  Render_refreshControlPanel = 'Render_refreshControlPanel',
  Render_cancelMessage = 'Render_cancelMessage',
  Render_cancelRoleConfig = 'Render_cancelRoleConfig',
  Render_saveWorkerAccount = 'Render_saveWorkerAccount',
  Render_addWorkerAccount = 'Render_addWorkerAccount',
  Render_updateWorkerAccount = 'Render_updateWorkerAccount',
  Render_updateWorkerGroup = 'Render_updateWorkerGroup',
  Render_createWorkerGroup = 'Render_createWorkerGroup',
  Render_resendAiMsg = 'Render_resendAiMsg',
  Render_workerStatus = 'Render_workerStatus',
  Render_setupChatGptRole = 'Render_setupChatGptRole',
  Render_setupChatGptRoleConfirm = 'Render_setupChatGptRoleConfirm',
}

export enum WorkerCallbackButtonAction {
  Worker_fetchSiteInfo = 'Worker_fetchSiteInfo',
  Worker_openHomeUrl = 'Worker_openHomeUrl',
  Worker_debug = 'Worker_debug',
  Worker_status = 'Worker_status',
  Worker_currentLocation = 'Worker_currentLocation',
  Worker_clickLoginButton = 'Worker_clickLoginButton',
  Worker_inputPrompts = 'Worker_inputPrompts',
  Worker_getActions = 'Worker_getActions',
  Worker_sendPromptTextareaMouseClick = 'Worker_sendPromptTextareaMouseClick',
  Worker_sendInputSpaceEvent = 'Worker_sendInputSpaceEvent',
  Worker_performClickSendPromptButton = 'Worker_performClickSendPromptButton',
  Worker_locationReload = 'Worker_locationReload',
  Worker_help = 'Worker_help',
  Worker_historyGoBack = 'Worker_historyGoBack',
  Worker_closeWindow = 'Worker_closeWindow',
  Worker_restartWindow = 'Worker_restartWindow',

  Worker_openDevTools = 'Worker_openDevTools',
  Worker_browserUserAgent = 'Worker_browserUserAgent',

  Worker_Tg_Chats = 'Worker_Tg_Chats',
  Worker_Tg_Open_Chat = 'Worker_Tg_Open_Chat',
}

export enum ServerCallbackButtonAction {
  Server_CreateChatGptBot = 'Server_CreateChatGptBot',
}

export type CallbackButtonActionType =
  | ServerCallbackButtonAction
  | WorkerCallbackButtonAction
  | CallbackButtonAction;

export type CallbackButtonRequest = {
  messageId: number;
  chatId: string;
};

export type CallbackButtonCreateWorkerRequest = {
  messageId: number;
  chatId: string;
  account?: LocalWorkerAccountType;
};

export enum BotStatusType {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
  READY = 'READY',
  InvokeApiError = 'InvokeApiError',
  Busy = 'Busy',
}

export const EVENT_MESSAGE_LIST_SCROLL_DOWN_END =
  'EVENT_MESSAGE_LIST_SCROLL_DOWN_END';
export const EVENT_MESSAGE_LIST_ENABLE_SCROLL_DOWN_END =
  'EVENT_MESSAGE_LIST_ENABLE_SCROLL_DOWN_END';

export type ServerBotAccountType = {
  botId: string;
  type: 'chatGpt';
  name?: string;
};

export type ReportChatGptAiTaskType = {
  id: number;
  userId: number;
  chatId: number;
  msgId: number;
  text: string;
  isDone?: boolean;
};

export type ChatGptAiTaskType = {
  accountAddress: string;
  chatId: string;
  msgId: number;
  text: string;
  taskId: number;
  isDone?: boolean;
  isError?: boolean;
  msgDate?: number;
};

export type SaveFileDataType = {
  type: 'string' | 'hex' | 'base64';
  filePath: string;
  content: string;
};

export type GetFileDataType = {
  filePath: string;
  type: 'string' | 'hex' | 'base64' | 'buffer';
};

export type ChatMsgSendingStatus =
  | 'messageSendingStatePending'
  | 'messageSendingStateFailed';

export type ChatMsgRenderResponse = {
  msgId: number;
  sendingState?: ChatMsgSendingStatus;
  inlineButtons?: any[];
};
