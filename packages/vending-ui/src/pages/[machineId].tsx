import React, { useCallback, useEffect } from 'react';
import Seo from '@/components/Seo';
import { Row, Col, Modal } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import styled from 'styled-components';
import Link from 'next/link';
import { useMachineProducts } from '@/hooks/machines';
import { useCart } from '@/hooks/carts';
import ProductPreview from '@/components/ProductPreview';
import AppBackground from '@/components/AppBackground';
import CartItem from '@/components/CartItem';
import Cart from '@/components/Cart';
import CartSelected from '@/components/CartSelected';
import { useCheckout } from '@/hooks/checkout';

const MachinePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 30px;
`;

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

const MachineVendingPage: NextPage<Props> = () => {
  const { query } = useRouter();
  const machineId = Number(query.machineId);
  const { data: product, refetch: refetchProduct, isLoading } = useMachineProducts(machineId);
  const { data: cart, mutations } = useCart(machineId);
  const { mutate: mutateCheckout, isLoading: isCheckingOut } = useCheckout();

  useEffect(() => {
    if (machineId) refetchProduct();
  }, [machineId, refetchProduct]);

  const findProductInCart = useCallback(
    (productId: number): number => {
      const inCartItemQty = cart?.items?.find((item) => item.productId === productId)?.qty;
      return inCartItemQty;
    },
    [cart],
  );

  const onCompleteModal = useCallback(() => {
    let secondsToGo = 6;
    const modal = Modal.success({
      title: 'Successfully Purchased !',
      content: "Thank you. Don't forgot your water. have a nice day.",
      centered: true,
      okText: `Buy Again (${secondsToGo})`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        okText: `Buy Again (${secondsToGo})`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }, []);

  return (
    <>
      <Seo title={`Machine | ${machineId}`} description="select any drinking as you want." />
      <MachinePageContainer>
        <Row>
          <Col flex="auto">
            <Row gutter={[8, 64]}>
              {product?.items?.map((item) => (
                <Col flex={product.totals > 5 ? '200px' : '300px'} key={item.product.id}>
                  <ProductPreview
                    image={item.product.image}
                    name={item.product.name}
                    price={item.product.price}
                    outOfStock={item.qty === 0}
                    onClick={() =>
                      mutations.addToCart({
                        productId: item.productId,
                        qty: 1,
                        maxSaleQty: item.qty,
                        name: item.product.name,
                        image: item.product.image,
                        price: item.product.price,
                      })
                    }
                  />
                  <CartSelected selectedQty={findProductInCart(item.productId)} />
                </Col>
              ))}
              {product?.items?.length === 0 && (
                <div>
                  Out Of Service <Link href="/">back</Link>{' '}
                </div>
              )}
            </Row>
          </Col>
          <Col flex="400px" />
        </Row>
        <Cart
          totals={cart?.totals}
          isEmpty={cart && cart?.items.length === 0}
          isLoading={isCheckingOut}
          onCheckoutClick={() =>
            mutateCheckout(
              {
                machineId: cart.machineId,
                paymentMethod: cart.paymentMethod,
                items: cart?.items.map((item) => ({
                  productId: item.productId,
                  qty: item.qty,
                })),
              },
              {
                onSuccess: () => {
                  refetchProduct();
                  onCompleteModal();
                  mutations.resetCart();
                },
                onError: (err) => {
                  alert(err?.response?.data?.message);
                },
              },
            )
          }
        >
          {cart?.items?.map((item) => (
            <CartItem
              key={item.productId}
              name={item.name}
              qty={item.qty}
              image={item.image}
              price={item.price}
              onRemoveClick={() => mutations.removeCartItem(item.productId)}
              onIncreaseClick={() => mutations.updateCartItem(item.productId, 1)}
              onDecreaseClick={() => mutations.updateCartItem(item.productId, -1)}
            />
          ))}
        </Cart>
        <AppBackground blur={isLoading ? 15 : 0} opacity={0.5} />
      </MachinePageContainer>
    </>
  );
};

export default MachineVendingPage;
