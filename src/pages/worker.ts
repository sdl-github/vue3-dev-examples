import { Application } from '@splinetool/runtime'

self.addEventListener('message', (e) => {
    console.log('worker on message', e.data);
    const { type, data } = e.data
    const spline = new Application(data as HTMLCanvasElement)
    spline.load('https://prod.spline.design/7rQ8-6iOwQFax5Gw/scene.splinecode').then(() => {
        // spline.load('./scene.splinecode').then(() => {
        console.log('3D模型加载并渲染完毕')
        spline.setZoom(1)
        spline.addEventListener('rendered', (e) => {
            console.log('I have been rendered!');
            self.postMessage('spline rendered');
        });
        self.postMessage('spline load');
    })
});

export default {}
