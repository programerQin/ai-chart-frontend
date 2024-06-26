import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */


const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer>
      <Card
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === 'realDark'
              ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
        }}
      >
        <div
          // style={{
          //   backgroundPosition: '100% -30%',
          //   backgroundRepeat: 'no-repeat',
          //   // backgroundSize: '274px auto',
          //   backgroundSize: '100% 100%',

          //   backgroundImage:
          //     "url('https://ai-chart.oss-cn-hangzhou.aliyuncs.com/BI.webp')",
          // }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎使用 智能BI
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            智能BI 是一个可以根基于Spring Boot +MQ + AIGC + React 的智能分析平台。
            您只需导入原始数据，并输入分析需求即可自动生成可视化的图表分析及其结论。
            另外您还可以对原始数据进行查看、编辑等操作。
            目前新注册用户可以免费获取大量积分，每次调用都会消耗积分，可以通过充值、抽奖、签到等方式补充积分。
            
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
