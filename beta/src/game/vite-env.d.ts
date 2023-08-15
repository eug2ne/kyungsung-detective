/// <reference types="vite/client" />

declare namespace Phaser
{
	interface Scene
	{
		sceneload: import('./plugin/SceneLoadPlugin').default
	}
}