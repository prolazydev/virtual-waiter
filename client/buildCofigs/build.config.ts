import fs from 'fs/promises';
import path from 'path';
import type { Resolver } from 'unplugin-auto-import/types';

// Resolver for AutoImport
export const composableResolver: Resolver = async (name) => {
	if (name.endsWith('Store')) {
		const storeName = (name.slice(3, name.length - 5)).toLowerCase();

        const path = `@/stores/${storeName}`

        logComponent('Store:', name, path)
		return path;
	}

	if (name.includes('Service')) {
		const serviceName = name.slice(0, name.indexOf('Service'))
        const path = await findComponent(`${serviceName}.service`, './src/services');
        
        logComponent('nService:', name, path!);
        return path;
	}	

	if (name.startsWith('my')) {
		const path = await findComponent(name, './src/utils');

        logComponent('Util:', name, path!);
		return path;
	}

	if (name.startsWith('use') || name.startsWith('tost')) {
        const path = `@/composables/${name}`;
        logComponent('Store:', name, path);

		return `@/composables/${name}`;
	} 
}
export const resolvePath = async (componentName: string) => await findComponent(componentName);

// Private

// find component locally that is nested inside components folder knowing only the name
const findComponent = async (componentName: string, startPath: string = './src/components'): Promise<string | null> =>  {
    const files = await fs.readdir(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = await fs.lstat(filename); // Retrieve the file status (whether it's a directory or not)

        if (stat.isDirectory()) {
            const result = await findComponent(componentName, filename);

            if (result) 
				return result;
        } else if (filename.indexOf(componentName) >= 0) 
            return path.join('@\\', filename.slice(4)).replace(/\\/g, '/');
    }
    return null;
}

/**
 * Log the component name and path
 * \n\x1b[94m - light blue 
 * \x1b[0m - reset color
 * @param title 
 * @param componentName 
 * @param path 
 */
function logComponent(title: string, componentName: string, path: string) {
    const paddedTitle = title.padEnd(11, ' ');
    console.log(`\n${paddedTitle}  \x1b[94m${componentName}\x1b[0m\nPath: \x1b[36m${path}\x1b[0m`);
}
