import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'Random',
        icon: 'file:randomicon.svg',
		group: ['input'],
		version: 1,
		description: 'Generate true random numbers using Random.org',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				placeholder: 'Ex: 1',
				description: 'Minimum number for random generation',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 60,
				placeholder: 'Ex: 60',
				description: 'Maximum number for random generation',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				if (min >= max) {
					throw new NodeOperationError(this.getNode(), 'O valor de "Min" deve ser menor que "Max"', { itemIndex: i });
				}

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`,
				});

				const randomNumber = parseInt(response as string, 10);

				returnData.push({
					json: {
						randomNumber,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: i });
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
