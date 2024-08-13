import fs from 'fs';
import path from 'path';
import type { Resolver } from 'unplugin-auto-import/types';

// Resolver for AutoImport
export const composableResolver: Resolver = name => {
	if ( name.endsWith('Store') ) {
		const storeName = (name.slice(3, name.length - 5)).toLowerCase();
		return `@/stores/${storeName}`;
	}

	if (name.includes('Service')) {
		const componentPath = findComponent(name, './src/services');
		console.log('Service: ', componentPath);

		const serviceName = name.slice(0, name.indexOf('Service'))
		return `@/services/${serviceName}.service`;
	}	

	// TODO: resolve the utils to find the file if it's nested inside a folder

	if (name.startsWith('my')) {
		const componentPath = findComponent(name, './src/utils');
		console.log('Util: ', componentPath);

		return componentPath;
	}

	if (name.startsWith('use') || name.startsWith('tost')) {
		console.log('Composable: ', name);
		return `@/composables/${name}`;
	} 
}

// Private
export const resolvePath = (componentName: string) => findComponent(componentName);

// find component locally t that is nested inside components folder knowing only the name
export const findComponent = (componentName: string, startPath: string = './src/components'): string | null =>  {
    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename); // Retrieve the file status (whether it's a directory or not)

        if (stat.isDirectory()) {
            const result = findComponent(componentName, filename);

            if (result) 
				return result;
        } else if (filename.indexOf(componentName) >= 0) 
            return path.join('@\\', filename.slice(4)).replace(/\\/g, '/');
    }
    return null;
}