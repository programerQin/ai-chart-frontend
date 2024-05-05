import { analysisBySynchronizeUsingPost, editchartUsingPost, updateChartUsingPost } from '@/services/aichart/chartController';
import { getUserByIdUsingGet } from '@/services/aichart/scoreController';
import { SaveEditableAction } from '@ant-design/pro-utils/es/useEditableArray';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Spin,
} from 'antd';
import { flow } from 'lodash';
import mermaid from 'mermaid';
import React, { useEffect, useState } from 'react';

/**
 * 图表分析（同步）
 */
export default function MermaidEditor() {
  const formItemLayout = {
    labelAlign: 'left',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const { TextArea } = Input;

  const ClassChartSample = '请输入图形描述,例如：\n一个汽车共享应用程序,人们可以成为许多汽车的司机。但是汽车和人都可以独立存在。人具有人的属性。汽车具有汽车属性。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  const SequenceChartSample = '请输入图形描述,例如：\n一个共享汽车的应用程序。两者都是用户,但只有司机正好有一辆车。只有乘客可以创建关于司机的评论。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  const EntityRelationChartSample = '请输入图形描述,例如：\n一个共享汽车的应用程序。两者都是用户,但只有司机正好有一辆车。只有乘客可以创建关于司机的评论。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';
  const flowChartSample = '请输入图形描述,例如：\n一个共享汽车的应用程序。两者都是用户,但只有司机正好有一辆车。只有乘客可以创建关于司机的评论。\n有时可能会生成语法无效的图形代码。如果发生这种情况,您可以尝试再次生成或手动更正图形代码中的错误';

  //用于存放图表数据
  const [chart, setChart] = useState<API.BiResponse>();
  // const [chart, setChart] = useState<API.Chart>();
  const [editData, setEditData] = useState(null);

  


  //用于存放图表文本
  const [text, setText] = useState('')
  // sequenceDiagram
  //     Alice->>John: Hello John, how are you?
  //     John-->>Alice: Great!
  //     Alice-)John: See you later!
  // `)
  const params = {
    chartId: chart?.chartId || '',
    // genResult: chart?.genResult || '',
    genChart: text
  }


  //关闭初始时加载，否者由于text为空会报错
  mermaid.initialize({ startOnLoad: false });

  // 图形渲染结果
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  //提交中的状态，默认为未提交
  const [submitting, setSubmitting] = useState<boolean>(false);
  //默认示例为流程图，和默认单选保持一致
  const [sample, setSample] = useState(flowChartSample);
  const setTextSample = (e: any) => {
    switch (e.target.value) {
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
  }
  async function mermaidRender(value) {
    setText(value);
    // chart.genChart = value;
    console.log(chart);
    const element = document.querySelector('#graphDiv');
    //如果e有值不为空
    if (value) {
      try {
        const { svg } = await mermaid.render('mermaid', value);
        element.innerHTML = svg;
        await mermaid.run();
        setAlertType('success');
        setAlertMessage('生成成功');
        return
      } catch (e) {
        setAlertType('error');
        setAlertMessage(e.message);
      }
    } else {
      setAlertType('info');
      setAlertMessage('请先输入图形描述');
    }
    element.innerHTML = "";

  }

  const onFinish = async (values: any) => {
    //避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    //再次提交后清空页面数据
    setChart(undefined);
    //此处先解构，拿到需要的参数
    const params = {
      type: 'dynamic',
      ...values,
    };
    try {
      const scoreRes = await getUserByIdUsingGet();
      if (scoreRes.data < 5) {
        message.error('积分不足');
      } else {
        const res = await analysisBySynchronizeUsingPost(
          params,
          {},
        );
        if (!res?.data) {
          message.error('分析失败:' + res.message);
        } else {
          message.success('分析成功');
          setChart(res.data);
          mermaidRender(res.data.genChart);
        }
      }
    } catch (e: any) {
      message.error('分析失败' + e.message);
    }
    //结束后设为false
    setSubmitting(false);
  };


  useEffect(() => {
    mermaid.contentLoaded()
  }, []);

 

  // async function downloadChart() {

  // }

  // //处理确认修改按钮点击事件
  // const handleEditConfirm = async (editedData: API.ChartUpdateRequest) => {
  //   try {
  //     const res = await updateChartUsingPost(editedData);
  //     if (res.data) {
  //       message.success('修改成功');
  //       // chartData();
  //     } else {
  //       message.error(res.message);
  //     }
  //   } catch (e: any) {
  //     message.error('修改失败：' + e.message);
  //   }
  //   // setIsModalVisible(false);
  // };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title={'智能画图'}>
            <Form
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
              <Form.Item label="图形种类" name={'chartType'} rules={[{ required: true }]}>
                <Radio.Group defaultValue="flow" size="small" onChange={setTextSample}>
                  {/* <Radio.Button value="流程图">流程图</Radio.Button> */}
                  <Radio.Button value="类图">类图</Radio.Button>
                  {/* <Radio.Button value="实体关系图">实体关系图</Radio.Button> */}
                  {/* <Radio.Button value="时序图">时序图</Radio.Button> */}
                </Radio.Group>
              </Form.Item>
              <Form.Item label="图表名称" name="chartName" rules={[{ required: true }]} >
                <Input placeholder={'请输入你的图表名称'} />
              </Form.Item>

              <Form.Item label="图形描述" name={'goal'} rules={[{ required: true }]}>
                <TextArea placeholder={sample} allowClear rows={16} />
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

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitting}
                    disabled={submitting}
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card title={'图形MarkDown文件 (如果图表生成报错，可以在此直接修正)'}>
            <TextArea autoSize value={text} allowClear onChange={(e)=>mermaidRender(e.target.value)} placeholder='请先提交表单生成MD或直接编写' />
            <Spin spinning={submitting} />
          </Card>
          
          <Button style={{ marginLeft: '5px' }} type={'primary'} size={'small'} onClick={() => updateChartUsingPost(params)}>
            保存修改
          </Button>

          <Divider></Divider>

          <Card title={'生成图形'}>

            <pre className="mermaid" id="graphDiv"  >
            </pre>

            <Spin spinning={submitting} />
          </Card>
          <Alert style={{ fontSize: 10 }} type={alertType || "info"} message={alertMessage || "等待填充图形MD文件"} showIcon closable />

        </Col>
      </Row>
    </div>
  );
};