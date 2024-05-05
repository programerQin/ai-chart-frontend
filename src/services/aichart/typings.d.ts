declare namespace API {
  type analysisByAsyncMqUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    goal?: string;
    mode?: string;
    type?: string;
  };

  type analysisByAsyncUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    goal?: string;
    mode?: string;
    type?: string;
  };

  type analysisBySynchronizeUsingPOSTParams = {
    chartName?: string;
    chartType?: string;
    goal?: string;
    mode?: string;
    type?: string;
  };

  type AwardListDTO = {
    awardId?: number;
    awardRuleLockCount?: number;
    awardSubtitle?: string;
    awardTitle?: string;
    isAwardUnlock?: boolean;
    sort?: number;
    waitUnLockCount?: number;
  };

  type BaseResponseBiResponse_ = {
    code?: number;
    data?: BiResponse;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChart_ = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseListAwardListDTO_ = {
    code?: number;
    data?: AwardListDTO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageChart_ = {
    code?: number;
    data?: PageChart_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiResponse = {
    chartId?: number;
    genChart?: string;
    genResult?: string;
  };

  type Chart = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
    isDelete?: number;
    model?: string;
    status?: string;
    type?: string;
    updateTime?: string;
    userId?: number;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    goal?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    goal?: string;
    id?: number;
  };

  type ChartQueryRequest = {
    chartName?: string;
    chartType?: string;
    current?: number;
    goal?: string;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartName?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: number;
  };

  type chatContStreamUsingGETParams = {
    /** msg */
    msg: string;
    /** msgUid */
    msgUid: string;
  };

  type chatContUsingPOSTParams = {
    /** msg */
    msg?: string;
  };

  type ChatResponse = {
    ban_round?: number;
    created?: number;
    eb_code?: number;
    error_code?: number;
    error_msg?: string;
    function_call?: FunctionCall;
    id?: string;
    is_end?: boolean;
    is_truncated?: boolean;
    need_clear_history?: boolean;
    object?: string;
    result?: string;
    sentence_id?: number;
    usage?: Usage;
  };

  type chatSingleStreamUsingGETParams = {
    /** msg */
    msg: string;
  };

  type chatSingleUsingPOST2Params = {
    /** id */
    id?: number;
  };

  type chatSingleUsingPOSTParams = {
    /** msg */
    msg?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type downloadUsingGETParams = {
    /** fileName */
    fileName: string;
  };

  type drawUsingGETParams = {
    /** activityId */
    activityId: number;
    /** userId */
    userId: number;
  };

  type File = {
    absolute?: boolean;
    absoluteFile?: File;
    absolutePath?: string;
    canonicalFile?: File;
    canonicalPath?: string;
    directory?: boolean;
    executable?: boolean;
    file?: boolean;
    freeSpace?: number;
    hidden?: boolean;
    lastModified?: number;
    name?: string;
    parent?: string;
    parentFile?: File;
    path?: string;
    readable?: boolean;
    totalSpace?: number;
    usableSpace?: number;
    writable?: boolean;
  };

  type fileDownloadUsingGETParams = {
    /** fileName */
    fileName: string;
  };

  type FluxString_ = {
    prefetch?: number;
  };

  type FunctionCall = {
    arguments?: string;
    name?: string;
    thoughts?: string;
  };

  type getAwardListUsingGETParams = {
    /** activityId */
    activityId: number;
    /** userId */
    userId: number;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGET1Params = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type ImageData = {
    b64_image?: string;
    index?: number;
    object?: string;
  };

  type ImageResponse = {
    created?: number;
    data?: ImageData[];
    error_code?: number;
    error_msg?: string;
    id?: string;
    object?: string;
    usage?: Usage;
  };

  type InputStream = true;

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type MonoChatResponse_ = true;

  type MonoImageResponse_ = true;

  type MonoPromptResponse_ = true;

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChart_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Chart[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PluginUsage = {
    abstract_tokens?: number;
    name?: string;
    parse_tokens?: number;
    search_tokens?: number;
    total_tokens?: number;
  };

  type PromptErrMessage = {
    global?: string;
  };

  type PromptResponse = {
    code?: string;
    error_code?: number;
    error_msg?: string;
    log_id?: string;
    message?: PromptErrMessage;
    result?: PromptResult;
    status?: number;
    success?: boolean;
  };

  type PromptResult = {
    content?: string;
    templateContent?: string;
    templateId?: string;
    templateName?: string;
    templateVariables?: string;
  };

  type Resource = {
    description?: string;
    file?: File;
    filename?: string;
    inputStream?: InputStream;
    open?: boolean;
    readable?: boolean;
    uri?: URI;
    url?: URL;
  };

  type retryUsingGETParams = {
    /** chartId */
    chartId?: number;
  };

  type URI = {
    absolute?: boolean;
    authority?: string;
    fragment?: string;
    host?: string;
    opaque?: boolean;
    path?: string;
    port?: number;
    query?: string;
    rawAuthority?: string;
    rawFragment?: string;
    rawPath?: string;
    rawQuery?: string;
    rawSchemeSpecificPart?: string;
    rawUserInfo?: string;
    scheme?: string;
    schemeSpecificPart?: string;
    userInfo?: string;
  };

  type URL = {
    authority?: string;
    content?: Record<string, any>;
    defaultPort?: number;
    file?: string;
    host?: string;
    path?: string;
    port?: number;
    protocol?: string;
    query?: string;
    ref?: string;
    userInfo?: string;
  };

  type Usage = {
    completion_tokens?: number;
    plugins?: PluginUsage[];
    prompt_tokens?: number;
    total_tokens?: number;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateMyRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
