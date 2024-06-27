import config from '~/config.generated.json';

export default function() {
	return useState('config', () => config);
}