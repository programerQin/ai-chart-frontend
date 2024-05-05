import React, { useState, useRef, useEffect } from 'react'
import { LuckyWheel } from '@lucky-canvas/react'
import { Card, Flex, List, Progress, Result, message } from 'antd'
import { drawUsingGet, getAwardListUsingGet } from '@/services/aichart/drawController'
import { Link, useModel } from '@@/exports';

export default function Lottery() {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? [];

  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' }
  ])
  const [prizes, setPrizes] = useState([])
  const [buttons] = useState([
    { radius: '50px', background: '#617df2' },
    { radius: '45px', background: '#afc8ff' },
    {
      radius: '40px', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始\n抽奖', top: '-20px' }]
    },
  ])
  const myLucky = useRef()
  const getAwardListParams = {
    userId: currentUser.id,
    activityId: 1,
  }

  type MyObject = {
    waitUnLockCount: number;
    lockCount: number;
    percent: number;
  };
  const [unlockList, setUnlockList] = useState<MyObject[]>([]);

  const awardData = async () => {
    try {
      const res = await getAwardListUsingGet(getAwardListParams);
      console.log('drawRes:' + res.data.map(item => JSON.stringify(item)).join(','));
      if (res.data) {
        // setI(0);
        let i: number = 0;
        res.data.forEach((data) => {
          i++;
          // console.log('i:' + i);
          // setPrizes([]);
          // prizes.splice(0, prizes.length);
          prizes.push(
            {
              background: '#e9e8fe',
              fonts: [{ text: data.awardTitle }],
              awardId: data.awardId,
              index: i
            }
          );
          // console.log('awardTitle:' + data.awardTitle);
          // console.log('awardId:' + data.awardId);
          // console.log('awardRuleLockCount:' + data.awardRuleLockCount);
          // console.log('waitUnLockCount:' + data.waitUnLockCount);
          // console.log('isAwardUnlock:' + data.isAwardUnlock);
          // console.log('------------------------------------');

          // if(!data.isAwardUnlock){
          //   // console.log('锁住奖品:' + data.awardTitle);
          //   // 假设 lockCount 和 waitUnLockCount 是从某些地方获取的
          //   let lockCount: number = data.awardRuleLockCount;
          //   let waitUnLockCount: number = data.waitUnLockCount;
          //   // console.info(lockCount)
          //   // console.info(waitUnLockCount)

          //   // 计算百分数
          //   let percent: number = ((lockCount - waitUnLockCount) / lockCount) * 100;
          //   // console.info(lockCount - waitUnLockCount)

          //   // console.info(percent)
          //   unlockList.push({
          //     waitUnLockCount: waitUnLockCount,
          //     lockCount: lockCount,
          //     percent: percent
          //   });
          // }
        }
        );
        console.log('prizes:' + prizes.map(item => JSON.stringify(item)).join(','));
        // console.log('lockList:' + unlockList.map(item => JSON.stringify(item)).join(','));


      } else {
        message.error('获取我的图表失败');
      }
    } catch (e: any) {
      message.error('获取我的图表失败,' + e.message);
    }
  };
  const draw = async () => {
    
      const res = await drawUsingGet(getAwardListParams);
      
      for (let i = 0; i < prizes.length; i++) {
        if (prizes[i].awardId !== undefined && prizes[i].awardId.toString() === res.data) {
            return i;
        }
    }
      return 0;
  }
  //首次加载页面或查询参数变化时，重新加载数据
  useEffect(() => {
    awardData();
  }, []);

  return <div style={{ margin: 'auto', width: '50%' }}>
    <Card>
    <p>抽奖规则说明:</p>
    <ol>
        <li>根据黑名单过滤用户,黑名单用户抽奖结果必定为随机积分</li>
        <li>用户抽奖会累积幸运值,幸运者到达一定挡位时，抽奖奖池会升级为高级奖池,当达到最高挡位后,会重置幸运值,奖池重新变为普通奖池</li>
        <li>用户每连续10次抽奖都没有抽到高级奖品,则下次必会抽到</li>
        <li>每种奖品每个人能抽到的次数有限制</li>
        <li>抽到的奖品,如果没有库存或达到次数限制,则给予保底奖</li>
    </ol>
    </Card>
    <Card style={{ width: 400, textAlign: 'center', padding: 20 }}>
    <div style={{ margin: 'auto', width: '100%' }}>
      <LuckyWheel
        ref={myLucky}
        width="300px"
        
        height="300px"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        onStart={async () => { // 点击抽奖按钮会触发star回调
          // const index = await draw();
          // console.log('indexxxxx:' + index);
          // if(index<=0){
          //   message.error('奖品已全部领取完');
          //   return;
          // }
          myLucky.current.play();
        
          setTimeout(() => {
          
            // const index = Math.random() * 6 >> 0
            // console.info("resIndex" + index)
            // try {
              draw().then(prizeIndex => {
                // @ts-ignore
                myLucky.current.stop(prizeIndex);
            })
            // } catch (error) {
            //   console.log(error);
            //   alert('恭喜你抽到奖品： ' + prizes[index].fonts[0].text)
            // }

          }, 2500)
        }}
        onEnd={prize => { // 抽奖结束会触发end回调
          alert('恭喜你抽到奖品： ' + prize.fonts[0].text)
        }}
      />
      {/* <List
        dataSource={unlockList}
        renderItem={(item) => (
          <List.Item>
              <List.Item.Meta
                title={item.awardTitle+' 解锁进度'}
              />
              <>
                <Flex gap="small" vertical>
                  <Progress type="circle" percent={item.percent} />
                </Flex>
                
              </>
          </List.Item>
        )
      }
      /> */}
      
    </div>
    
    </Card>
    

  </div>
}