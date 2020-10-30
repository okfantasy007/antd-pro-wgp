import Input from "antd/es/input/Input";
import React, { useRef, useState, useEffect } from 'react';
import { history } from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Radio, Select, Row, Col, Button} from 'antd';
import { TableListItem } from '../data.d';
import { queryList, queryProductLines } from '../../service';

const LabelUpdateList: React.FC<{}> = (props) => {

  interface ActionType {
    reload: (resetPageIndex?: boolean) => void;
    fetchMore: () => void;
    reset: () => void;
  }

  const ref = useRef<ActionType>();
  const [totalCount, setTotalCount] = useState(0);
  const [product, setProduct] = useState("");
  const [updateTime, setUpdateTime] = useState(90);
  const [productLines, setProductLines] = useState([]);
  const [email, setEmail] = useState("");
  const [field, setField] = useState("");
  const [order, setOrder] = useState("");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    queryProductLines().then((res: { data: React.SetStateAction<never[]>; }) => {
      console.log('queryProductLines', res);
      setProductLines(res.data);
    })
  }, []);

  const genItems = (size: number) => {
    let res = [];
    for (let i = 0; i < size; i++) {
      res.push({
        "map_id": 2,
        "customer_id": i + 1,
        "report_list": {
          "email": "ws@wondershare.cn",
          "last_active": "1天前",
          "actions_num": 100,
          "actions_seven_day_num": 10,
          "action_products": [
            "filmora",
            "dr.fone"
          ],
          "all_orders": 3,
          "all_charge": "$30",
          "all_refund": 1,
          "order_products": [
            "filmora",
            "pdfelement"
          ],
          "enter_chatbot_num": 10,
          "intent_active_num": 10,
          "tags": [
            "leads",
            "users",
            "customers",
            "slipping"
          ],
          "zendesk_rate": "Good",
          "zendesk_city": "Shenzhen",
          "zendesk_country": "United States",
          "zendesk_browser_language": "English",
          "zendesk_department": "filmora",
          "cbs_ticket_num": 2,
          "cbs_products": [
            "filmora",
            "edraw"
          ]
        },
        "report_info": null,
        "reserve_field1": null,
        "reserve_field2": null,
        "create_time": "2020-08-11 16:47:51",
        "update_time": "2020-08-11 16:47:51",
        "status": 0,
        "is_delete": 0
      });
    }
    return res;
  };
  const onChangeProduct = (value: string) => {
    setProduct(value);
    // ref.current.reload(true);
  };

  const onChangeEmail = (e: Event) => {
    // @ts-ignore
    setEmail(e.target.value);
  };

  const onChangeUpdateTime = (e: Event) => {
    // @ts-ignore
    setUpdateTime(e.target.value);
    // @ts-ignore
    ref.current.reload(true);
  };

  const query = () => {
    // @ts-ignore
    ref.current.reload(true);
  };

  const reset = () => {
    setProduct("");
    setEmail("");
    query();
  };
  const ellipsisCfg = totalCount > 0 ?
    {
      ellipsis: true,
      width: 270
    } : {};

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'CRM ID',
      dataIndex: 'uid',
      key: 'uid',
      ellipsis: true,
      width: 200
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
      width: 250
    },
    {
      title: '最近活动时间',
      dataIndex: 'last_active',
      sorter: true,
      ellipsis: true,
      width: 125
    },
    {
      title: '总行为次数',
      dataIndex: 'actions_num',
      sorter: true,
      ellipsis: true,
      width: 125,
      align: 'center'
    },
    {
      title: '最近7天行为次数',
      dataIndex: 'actions_seven_day_num',
      sorter: true,
      ellipsis: true,
      width: 125,
      render: (item) => (
        <span style={{ textAlign: 'center' }}>{item}</span>
      ),
    },
    {
      title: '行为产品',
      dataIndex: 'action_products',
      ...ellipsisCfg
    },
    {
      title: '累积订单',
      dataIndex: 'all_orders',
    },
    {
      title: '累积金额',
      dataIndex: 'all_charge',
      render: (item) => (
        <>
          {'$' + item}
        </>
      ),
    },
    {
      title: '退款',
      dataIndex: 'all_refund',
    },
    {
      title: '订单产品',
      dataIndex: 'order_products',
      ...ellipsisCfg
    },
    {
      title: '进入Chatbot总次数',
      dataIndex: 'enter_chatbot_num',
    },
    {
      title: '发起intent',
      dataIndex: 'intent_active_num',
    },
    {
      title: 'zendesk评价',
      dataIndex: 'zendesk_rate',
    },
    {
      title: 'zendesk城市',
      dataIndex: 'zendesk_city',
    },
    {
      title: 'zendesk国家|地区',
      dataIndex: 'zendesk_country',
      ellipsis: true,
      width: 110
    },
    {
      title: 'zendesk browser language',
      dataIndex: 'zendesk_browser_language',
      ellipsis: true,
      width: 125
    },
    {
      title: 'zendesk department',
      dataIndex: 'zendesk_department',
    },
    {
      title: 'CBS帖子',
      dataIndex: 'cbs_ticket_num',
    },
    {
      title: 'CBS产品',
      dataIndex: 'cbs_products',
      ...ellipsisCfg
    }
  ];
  const getRecordId = () => {
    let res = "";
    if (props.match.params) {
      const { report_id: reportId } = props.match.params;
      if (reportId && reportId.includes("report_id=")) {
        res = reportId.split("report_id=")[1];
      }
    }
    return res;
  };
  const requestFunc = (params: { current: any; pageSize: any; }) => {
    /*let res = queryList(params);
    console.log(res);
    return res;*/
    const currentParams = {
      page: params.current,
      page_size: params.pageSize
    };
    if (product) {
      currentParams.product = product;
    }
    if (email) {
      currentParams.email = email;
    }
    if (updateTime) {
      currentParams.update_time = updateTime;
    }
    if (field && order) {
      currentParams.order_field = field;
      let od = "";
      if (order === "descend") {
        od = "desc";
      } else if (order === "ascend") {
        od = "asc";
      }
      if (od) {
        currentParams.order = od;
      }
    }

    const recordId = getRecordId();
    return queryList(currentParams, recordId).then(res => {
      setTotalCount(res.data.total);
      const result = {
        data: res.data.item,
        total: res.data.total,
        success: true,
        page: params.current,
      };
      console.log(result)
      return result;
    })
  };

  const handleTableChange = (pagination: { current: any; pageSize: any; }, filters: any, sorter: { field: any; order: any; }) => {
    const { current: tCurrent, pageSize: tPageSize } = pagination;

    if (tCurrent !== current) {
      setCurrent(tCurrent);
    }
    if (tPageSize !== pageSize) {
      setPageSize(tPageSize);
    }
    if (tCurrent === current && tPageSize === pageSize) {
      const { field, order } = sorter;
      console.log(sorter)
      if (field) {
        setField(field);
        setOrder(order === undefined ? "" : order);
        // @ts-ignore
        ref.current.reload(true);
      }
    }
  };

  // @ts-ignore
  return (
      <ProTable<TableListItem>
        headerTitle={`${totalCount}条记录`}
        search={false}
        rowKey="uid"
        actionRef={ref}
        request={requestFunc}
        columns={columns}
        scroll={{ x: 2800 }}
        onChange={handleTableChange}
      />
  );
};

export default LabelUpdateList;
