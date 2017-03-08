import React from 'react';
import ModalContainer from './component/dialog/modalContainer.js'
import ModalDialog from './component/dialog/modalDialog.js'
import Button from './component/button.js'
import 'whatwg-fetch';

export default class BackupSelection extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOpen: false,
      nodes : []
    };

    this.toggle = this.toggle.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.retrieveRoots = this.retrieveRoots.bind(this);
    this.convertNodes = this.convertNodes.bind(this);
    this.getRelativeStoragePathFromHref = this.getRelativeStoragePathFromHref.bind(this);
  }

  toggle = () => {
    console.log('Toggle modal');
    this.setState({isOpen: !this.state.isOpen})
  }

  componentDidMount() {
    this.retrieveRoots();
  }

  retrieveRoots() {
        fetch(`http://localhost:8000/storage/node?path=/home/ben`)
        .then(result => {
            if (result.ok) {
              result.json().then(json => {
                this.setState({nodes:this.convertNodes(json._embedded.nodes)});
              });
            } else {
              console.log('Not ok: ' + result.status);
            }
        });
  }

  convertNodes(nodes) {
    console.log('Converting nodes');
    let id = 0;
    let convertedNodes = [];
    for (let index = 0; index < nodes.length; index++) {
        let currentNode = nodes[index];
        let link = this.getRelativeStoragePathFromHref(currentNode._links.children.href.toString());
        convertedNodes.push({
            id:id++,
            title: currentNode.path,
            date: currentNode.lastModified,
            linkToNodes: link,
            nodes: []
        });
    }
    return convertedNodes;
  }

  getRelativeStoragePathFromHref(href) {
    let index = href.search('/storage');
    return href.substring(index).trim();
  }

  render() {
    const { isOpen } = this.state;
    const { nodes } = this.state;
    let nodeList = nodes.map(function(node) {
        return <p key={node.id} >{node.title}</p>
      }
    );

    return <div>
            <Button value="Edit" callback={this.toggle}/>
            {
              isOpen &&
                <ModalContainer onClose={this.toggle}>
                  <ModalDialog children={nodeList} onClose={this.toggle} width={500} dismissOnBackgroundClick={true}/>
                </ModalContainer>
            }
           </div>;
  }
}
