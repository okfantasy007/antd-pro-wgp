import React from "react";
import {Tree, Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

const {Search} = Input;

const x = 3;
const y = 2;
const z = 1;
const gData: never[] = [];

// @ts-ignore
const generateData = (_level: number, _preKey: string | undefined, _tns: never[] | undefined) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    // @ts-ignore
    tns.push({title: key, key});
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    // @ts-ignore
    tns[index].children = [];
    // @ts-ignore
    return generateData(level, key, tns[index].children);
  });
};
// @ts-ignore
generateData(z);

const dataList: { key: any; title: any; }[] = [];
const generateList = (data: string | any[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const {key} = node;
    dataList.push({key, title: key});
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

// @ts-ignore
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item: { key: any; }) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  onExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e: { target: { value: any; }; }) => {
    const {value} = e.target;
    const expandedKeys = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, gData);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  render() {
    const {searchValue, expandedKeys, autoExpandParent} = this.state;
    // @ts-ignore
    const loop = (data: any[]) =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span className="site-tree-search-value">{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );
        if (item.children) {
          return {title, key: item.key, children: loop(item.children)};
        }

        return {
          title,
          key: item.key,
        };
      });
    return (
      <div>
        <Search style={{marginBottom: 8}} placeholder="搜索标签" onChange={this.onChange}/>
        <Input placeholder="搜索标签" bordered={false} suffix={
          <SearchOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: 16}} />
        }/>
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(gData)}
        />
      </div>
    );
  }
}

export default SearchTree;
