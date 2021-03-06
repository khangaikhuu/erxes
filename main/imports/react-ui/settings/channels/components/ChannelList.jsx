import React, { PropTypes, Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import { ModalTrigger } from '/imports/react-ui/common';
import Sidebar from '../../Sidebar.jsx';
import { ChannelForm } from '../containers';
import Row from './Row.jsx';


const propTypes = {
  channels: PropTypes.array.isRequired,
  removeChannel: PropTypes.func.isRequired,
};

class ChannelList extends Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
  }

  renderChannels() {
    const { channels, removeChannel } = this.props;

    return channels.map(channel =>
      <Row
        key={channel._id}
        channel={channel}
        removeChannel={removeChannel}
      />
    );
  }

  render() {
    const trigger = <Button bsStyle="link"><i className="ion-plus-circled" /> New channel</Button>;
    const actionBarLeft = (
      <ModalTrigger title="New channel" trigger={trigger}>
        <ChannelForm />
      </ModalTrigger>
    );
    const actionBar = (
      <Wrapper.ActionBar left={actionBarLeft} />
    );

    const content = (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderChannels()}
        </tbody>
      </Table>
    );

    const breadcrumb = [
      { title: 'Settings', link: '/settings/channels' },
      { title: 'Channels' },
    ];

    return (
      <div>
        <Wrapper
          header={<Wrapper.Header breadcrumb={breadcrumb} />}
          leftSidebar={<Sidebar />}
          actionBar={actionBar}
          content={content}
        />
      </div>
    );
  }
}

ChannelList.propTypes = propTypes;

export default ChannelList;
