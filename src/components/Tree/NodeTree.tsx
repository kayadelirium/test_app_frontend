import { INodeTree } from '../../types';
import { Node } from './Node';

type Props = {
    nodes: INodeTree[];
    touchNode: (node: INodeTree) => void;
};
export const NodeTree: React.FC<Props> = (props: Props) => {
    const { nodes, touchNode } = props;
    return (
        <div style={{ marginLeft: '40px' }}>
            {nodes.map((node) => (
                <div key={node.id + '_' + node.children.length}>
                    <Node key={node.id} node={node} touchNode={touchNode} />
                    <NodeTree nodes={node.children} touchNode={touchNode} />
                </div>
            ))}
        </div>
    );
};
