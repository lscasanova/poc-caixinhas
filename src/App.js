import * as React from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import { textStyle, orderStyle, defaultStyle, routeStyle, fenceStyle } from './styles';
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
    this.state = {
      order: [],
      list: []
    };
  }

  add_route() {
    const name = 'Trecho' + this.state.list.length
    this.setState({
      order: ['start', ...this.state.order.slice(1, this.state.order.length - 1), name, 'end'],
      list: [...this.state.list, { name, type: 'route' }]
    });
  }

  add_fence() {
    const name = 'Cerca' + this.state.list.length
    this.setState({
      order: ['start', ...this.state.order.slice(1, this.state.order.length - 1), name, 'end'],
      list: [...this.state.list, { name, type: 'fence' }]
    });
  }

  render() {
    return (
      <div style={{ padding: '10px' }}>
        <button type="button" onClick={() => this.add_route()}>Add Trecho</button>
        <button type="button" onClick={() => this.add_fence()}>Add Cerca</button>
        <SortablePane style={{ padding: '30px', zIndex: '10'}}
          direction="horizontal"
          margin={20}
          onOrderChange={order => this.setState({ order })}
        >
          {[
            <Pane
              key='start'
              defaultSize={{ width: 90, height: 90 }}
              resizable={{ x: false, y: false, xy: false }}
              className="0"
              style={defaultStyle}>
                <p style={textStyle}>Início</p>
            </Pane>,
            ...this.state.list.map(el =>
              <Pane
                key={el.name}
                defaultSize={{ width: 200, height: 120 }}
                resizable={{ x: false, y: false, xy: false }}
                className={String(this.state.order.indexOf(el.name))}
                style={el.type === 'fence' ? fenceStyle : routeStyle}>
                  <p style={textStyle}>{el.name}</p>
                  <p style={orderStyle}>{this.state.order.indexOf(el.name)}</p>
              </Pane>
            ),
            <Pane
              key='end'
              defaultSize={{ width: 90, height: 90 }}
              resizable={{ x: false, y: false, xy: false }}
              className="end"
              style={defaultStyle}>
                <p style={textStyle}>Fim</p>
            </Pane>,
            ...this.state.list.map(el =>
              <SteppedLineTo
                key={`line${el.name}`}
                from={String(this.state.order.indexOf(el.name)-1)}
                to={String(this.state.order.indexOf(el.name))}
                orientation="h"
                borderColor="#000"
                borderWidth="3"
                zIndex="-1"
              />
            ),
            <SteppedLineTo
                key={`lineEnd`}
                from={String(this.state.list.length)}
                to="end"
                orientation="h"
                borderColor="#000"
                borderWidth="3"
                zIndex="-1"
              />
          ]}
        </SortablePane>
      </div>
    );
  }
}
