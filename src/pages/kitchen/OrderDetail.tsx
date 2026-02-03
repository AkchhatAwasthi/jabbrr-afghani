import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const KitchenOrderDetail = () => {
    const { id } = useParams();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Detail: {id}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Order details will appear here.</p>
            </CardContent>
        </Card>
    );
};

export default KitchenOrderDetail;
