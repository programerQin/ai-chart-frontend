import { analysisByAsyncMqUsingPost, analysisByAsyncUsingPost } from '@/services/aichart/chartController';
import { fileDownloadUsingGet } from '@/services/aichart/commonController';
import { getUserByIdUsingGet } from '@/services/aichart/scoreController';
import { useModel } from '@@/exports';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, Radio, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';

/**
 * 图表分析（异步）
 */
const addChartAsync: React.FC = () => {

  //用于处理表单
  const [form] = useForm();

  const ClassChartSample = '请输入图形描述,例如：\n一个汽车共享应用程序,人们可以成为许多汽车的司机。但是汽车和人都可以独立存在。人具有人的属性。汽车具有汽车属性。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  const SequenceChartSample = '请输入图形描述,例如：\n一个共享汽车的应用程序。两者都是用户,但只有司机正好有一辆车。只有乘客可以创建关于司机的评论。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  const EntityRelationChartSample = '请输入图形描述,例如：\n一个共享汽车的应用程序。两者都是用户,但只有司机正好有一辆车。只有乘客可以创建关于司机的评论。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  const flowChartSample = '请输入图形描述,例如：\n一个共享汽车的应用程序。两者都是用户,但只有司机正好有一辆车。只有乘客可以创建关于司机的评论。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  
  const [chartType, setChartType] = useState('');
  // 变量初始值即使为空，页面加载往后，会变成绑定的默认值，默认值级别高，
  // 如果没有默认值，就会依照变量的初始值，如果像单选框必须要有一个，设置初始值为空，会有什么结果？那结果就为空
  const [typeVal, setTypeVal] = useState('static');
  const [isHidden, setIsHidden] = useState(false);
  const [sample, setSample] = useState(flowChartSample);

  //根据图表类型动态设置示例
  const setTextSample = () => {
    if (isHidden) {
      switch (chartType) {
        case 'flow':
          setSample(flowChartSample);
          break;
        case 'sequence':
          setSample(SequenceChartSample);
          break;
        case 'entity':
          setSample(EntityRelationChartSample);
          break;

        case 'class':
          setSample(ClassChartSample);
          break;

        default:
          setSample(flowChartSample);
      }

    } else {
      setSample(flowChartSample);
    }
  }
  function setHidden(e: any) {
    const originalValue = e.target.value;
    console.info(typeVal);
    console.info(originalValue);
    // 清空表单会恢复默认值，而不是变为空
    form.resetFields();
    console.info(typeVal);
    console.info(originalValue);
    // 这里通过使用set方式改变typeVal，不会触发onChange
    setTypeVal(originalValue);
    // typeVal = originalValue;
    console.info(typeVal);
    if (originalValue === 'dynamic') {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }


  //提交中的状态，默认为未提交
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { TextArea } = Input;
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? [];
  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);

    //此处先解构，拿到需要的参数
    const params = {
      ...values,
      file: undefined,
      type: typeVal,
    };
    try {
      const scoreRes = await getUserByIdUsingGet();
      console.log('积分数：' + scoreRes.data);
      if (scoreRes.data < 5) {
        message.error('积分不足，请联系管理员！');
      } else {
        const res = await analysisByAsyncUsingPost(params, {}, values.file?values.file.file.originFileObj:undefined);
        if (!res?.data) {
          message.error('分析失败:' + res.message);
        } else {
          message.success('分析成功，稍后可在我的图表页面中查看');
          //分析成功后，清空表单
          form.resetFields();
        }
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
    }
    //结束后设为false
    setSubmitting(false);
  };
  const formItemLayout = {
    labelAlign: 'left',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const downloadTest = async () => {
    const fileName = "test.xlsx";
    await fileDownloadUsingGet({ fileName });

  };

  return (
    <div className="add-chart-async">
      <Card title={'智能分析'}>
        <Radio.Group name="图形类别"  size="small" onChange={setHidden} value={typeVal}>
          <Radio.Button value="static">静态结构图</Radio.Button>
          <Radio.Button value="dynamic">动态行为图</Radio.Button>
        </Radio.Group>
        <Divider/>
        <Form
          form={form}
          name="add-chart"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
            'color-picker': null,
          }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="chartType" label="图表类型">
            <Select onChange={setTextSample} value={chartType}
              options={
                !isHidden ? ([
                  { value: '折线图', label: '折线图' },
                  { value: '柱状图', label: '柱状图' },
                  { value: '散点图', label: '散点图' },
                  { value: '饼图', label: '饼图' },
                  { value: '雷达图', label: '雷达图' },
                ]) : (
                  [
                    { value: '流程图', label: '流程图' },
                    { value: '类图', label: '类图' },
                    { value: '时序图', label: '时序图' },
                    { value: '实体关系图', label: '实体关系图' },
                  ]
                )
              }
            ></Select>
          </Form.Item>
          <Form.Item label="图形描述" name={'goal'} rules={[{ required: true }]}>
            <TextArea placeholder={sample} allowClear rows={16} />
          </Form.Item>
          <Form.Item label="图表名称" name="chartName" rules={[{ required: true }]}>
            <Input placeholder={'请输入你的图表名称'} />
          </Form.Item>

          <Form.Item name="mode" label="大模型">
            <Select
              options={[
                { value: 'GLM_3_5_TURBO', label: 'GLM_3_5_TURBO (推荐) 适用于复杂的对话交互和深度内容创作设计的场景' },
                { value: 'CHATGLM_TURBO', label: 'CHATGLM_TURBO 适用于对知识量、推理能力、创造力要求较高的场景' },
                { value: 'GLM_4', label: 'GLM_4 适用于复杂的对话交互和深度内容创作设计的场景' },
                { value: 'GLM_4V', label: 'GLM_4V 根据输入的自然语言指令和图像信息完成任务' },
                { value: 'COGVIEW_3', label: 'COGVIEW_3 根据文字生成图片' },

              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="原始数据"
            rules={[{ required: !isHidden, message: '请上传文件' }]}
            hidden={isHidden}
          >
            <Upload name="file" maxCount={1} accept={'.xls,.xlsx'}>
              <Button icon={<UploadOutlined />}>上传excel文件</Button>
            </Upload>
          </Form.Item>
          <Button
            type="default"
            size="small"

            style={{ fontSize: 9 }}
            icon={<DownloadOutlined />}
            onClick={downloadTest}
            hidden={isHidden}
          >
            示例数据
          </Button>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="Submit" loading={submitting} disabled={submitting}>
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default addChartAsync;
