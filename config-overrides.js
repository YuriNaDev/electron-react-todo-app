const { override, addWebpackAlias, getBabelLoader } = require('customize-cra')

const addElectronTarget = config => {
	config.target = 'electron-renderer'
	return config
}

const addReactHotLoader = config => {
	if (config.mode === 'production') return config
	getBabelLoader(config, false).options.plugins.push('react-hot-loader/babel')
	return config
}

module.exports = override(addElectronTarget, addWebpackAlias({ 'react-dom': '@hot-loader/react-dom' }), addReactHotLoader)
