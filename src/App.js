import * as React from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { textStyle, paneStyle } from './styles';


export default class ControllableOrder extends React.Component {
  id = 0;
  state = {
    list: [],
    order: [],
    data: {},
  };

  add() {
    const pos = (this.state.list.length-1);
    const order = [...this.state.order];
    order.splice(pos, 0, String(this.id));
    this.state.list.splice(
      pos,
      0,
      <Pane
        key={this.id}
        defaultSize={{ width: 150, height: 120 }}
        resizable={{ x: false, y: false, xy: false }}
        style={paneStyle}>
          <p style={textStyle}>00{this.id++}</p>
      </Pane>,
    );
    this.setState({ list: this.state.list, order });
  }

  remove() {
    const index = ~~(Math.random() * this.state.list.length);
    const pane = this.state.list.splice(index, 1);
    const order = this.state.order.filter(o => o !== pane[0].key);
    this.setState({ list: this.state.list, order });
  }

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <button type="button" onClick={() => this.add()}>Add</button>
        <button type="button" onClick={() => this.remove()}>Remove</button>
        <SortablePane
          direction="horizontal"
          margin={20}
          order={this.state.order}
          onOrderChange={order => this.setState({ order })}
        >
          {this.state.list}
        </SortablePane>
      </div>
    );
  }
}
