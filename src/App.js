import * as React from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { textStyle, defaultStyle, routeStyle, fenceStyle } from './styles';
import { SteppedLineTo } from 'react-lineto';



export default class ControllableOrder extends React.Component {
  id = 0;
  state = {
    list: [],
    order: [],
    data: {},
  };

  constructor(props) {
    super(props);
    const pos = (this.state.list.length);
    this.state = {
      order: ['hogeInicio', 'hogeFim'],
      list: ["Inicio", "Fim"].map(id => (
        // <div>
        <Pane
          key={`hoge${id}`}
          defaultSize={{ width: 90, height: 90 }}
          className={ pos }
          style={defaultStyle}>
            <p style={textStyle}>{id}</p>
        </Pane>
        // <SteppedLineTo from={pos - 1} to={pos} orientation="v" />
        // </div>
      )),
    };
  }

  add_route() {
    const pos = (this.state.list.length-1);
    const order = [...this.state.order];
    order.splice(pos, 0, String(this.id));
    this.state.list.splice(
      pos,
      0,
      // <div>
      <Pane
        key={this.id}
        className={ pos }
        defaultSize={{ width: 200, height: 120 }}
        resizable={{ x: false, y: false, xy: false }}
        style={routeStyle}>
          <p style={textStyle}>00{this.id++}</p>
      </Pane>
      // <SteppedLineTo from={pos - 1} to={pos} orientation="v" />
      // </div>,
    );
    this.setState({ list: this.state.list, order });
  }

  add_fence() {
    const pos = (this.state.list.length-1);
    const order = [...this.state.order];
    order.splice(pos, 0, String(this.id));
    this.state.list.splice(
      pos,
      0,
      // <div>
      <Pane
        key={this.id}
        className={ pos }
        defaultSize={{ width: 150, height: 150 }}
        resizable={{ x: false, y: false, xy: false }}
        style={fenceStyle}>
          <p style={textStyle}>00{this.id++}</p>
      </Pane>
      // <SteppedLineTo from={pos - 1} to={pos} orientation="v" />
      // </div>,
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
        <button type="button" onClick={() => this.add_route()}>Add Trecho</button>
        <button type="button" onClick={() => this.add_fence()}>Add Cerca</button>
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
