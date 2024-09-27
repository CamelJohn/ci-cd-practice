import { TaskIdParamValidationSchema, TaskRequestBodyValidationSchema } from './validation.schemas';
import { validateRequestBody, validateUrlParams } from './validators';

export const validators = {
    urlIdParam: validateUrlParams(TaskIdParamValidationSchema),
    body: validateRequestBody(TaskRequestBodyValidationSchema),
}